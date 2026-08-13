import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { claims, items, users } from '@/lib/schema';
import { eq, desc, and } from 'drizzle-orm';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';

// GET /api/claims - Get claims (filtered by user role)
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const searchParams = request.nextUrl.searchParams;
    const itemId = searchParams.get('itemId');
    const status = searchParams.get('status');

    // Get user record to check role
    const userRecords = await db.select().from(users).where(eq(users.email, session.user.email!)).limit(1);
    
    if (userRecords.length === 0) {
      return NextResponse.json(
        { success: false, error: 'User not found' },
        { status: 404 }
      );
    }

    const user = userRecords[0];
    let whereConditions = [];

    // Regular users can only see their own claims
    if (user.role !== 'admin') {
      whereConditions.push(eq(claims.userId, user.id));
    }

    if (itemId) {
      whereConditions.push(eq(claims.itemId, parseInt(itemId)));
    }

    if (status) {
      whereConditions.push(eq(claims.verificationStatus, status as any));
    }

    const whereClause = whereConditions.length > 0 
      ? and(...whereConditions) 
      : undefined;

    const claimsList = await db.select({
      id: claims.id,
      userId: claims.userId,
      itemId: claims.itemId,
      claimDate: claims.claimDate,
      proofDescription: claims.proofDescription,
      verificationStatus: claims.verificationStatus,
      aiFraudScore: claims.aiFraudScore,
      createdAt: claims.createdAt,
      itemName: items.description,
      itemCategory: items.category,
      itemStatus: items.status,
      claimantName: users.name,
      claimantEmail: users.email,
    })
    .from(claims)
    .leftJoin(items, eq(claims.itemId, items.id))
    .leftJoin(users, eq(claims.userId, users.id))
    .where(whereClause)
    .orderBy(desc(claims.claimDate));

    return NextResponse.json({
      success: true,
      data: claimsList,
    });
  } catch (error) {
    console.error('Error fetching claims:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch claims' },
      { status: 500 }
    );
  }
}

// POST /api/claims - Submit a new claim
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { itemId, proofDescription } = body;

    if (!itemId || !proofDescription) {
      return NextResponse.json(
        { success: false, error: 'Item ID and proof description are required' },
        { status: 400 }
      );
    }

    // Get user ID
    const userRecords = await db.select().from(users).where(eq(users.email, session.user.email!)).limit(1);
    
    if (userRecords.length === 0) {
      return NextResponse.json(
        { success: false, error: 'User not found' },
        { status: 404 }
      );
    }

    const userId = userRecords[0].id;

    // Check if item exists and is available
    const itemRecords = await db.select().from(items).where(eq(items.id, parseInt(itemId))).limit(1);
    
    if (itemRecords.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Item not found' },
        { status: 404 }
      );
    }

    const item = itemRecords[0];

    if (item.status === 'Returned' || item.status === 'Claimed') {
      return NextResponse.json(
        { success: false, error: 'Item unavailable for claiming' },
        { status: 400 }
      );
    }

    // Check for existing claim by this user on this item
    const existingClaims = await db.select().from(claims)
      .where(and(
        eq(claims.itemId, parseInt(itemId)),
        eq(claims.userId, userId)
      ))
      .limit(1);

    if (existingClaims.length > 0) {
      return NextResponse.json(
        { success: false, error: 'Claim already exists for this item' },
        { status: 400 }
      );
    }

    // Create claim
    const result = await db.insert(claims).values({
      userId,
      itemId: parseInt(itemId),
      proofDescription,
      verificationStatus: 'Pending',
    });

    // Update item status to Claimed
    await db.update(items)
      .set({ status: 'Claimed' })
      .where(eq(items.id, parseInt(itemId)));

    return NextResponse.json({
      success: true,
      message: 'Claim submitted successfully',
      claimId: result.insertId,
    });
  } catch (error) {
    console.error('Error submitting claim:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to submit claim' },
      { status: 500 }
    );
  }
}

// PATCH /api/claims/:id - Review/approve/reject claim (admin only)
export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Check if admin
    const userRecords = await db.select().from(users).where(eq(users.email, session.user.email!)).limit(1);
    
    if (userRecords.length === 0 || userRecords[0].role !== 'admin') {
      return NextResponse.json(
        { success: false, error: 'Admin access required' },
        { status: 403 }
      );
    }

    const body = await request.json();
    const { status } = body;

    if (!['Approved', 'Rejected'].includes(status)) {
      return NextResponse.json(
        { success: false, error: 'Invalid status' },
        { status: 400 }
      );
    }

    const claimId = parseInt(params.id);

    // Update claim status
    await db.update(claims)
      .set({ verificationStatus: status as any })
      .where(eq(claims.id, claimId));

    // If approved, update item status to Returned (trigger would do this in DB)
    if (status === 'Approved') {
      const claimRecord = await db.select().from(claims).where(eq(claims.id, claimId)).limit(1);
      
      if (claimRecord.length > 0) {
        await db.update(items)
          .set({ status: 'Returned' })
          .where(eq(items.id, claimRecord[0].itemId));
      }
    }

    return NextResponse.json({
      success: true,
      message: `Claim ${status.toLowerCase()} successfully`,
    });
  } catch (error) {
    console.error('Error reviewing claim:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to review claim' },
      { status: 500 }
    );
  }
}
