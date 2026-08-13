import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { items, users } from '@/lib/schema';
import { eq, desc, like, or, and } from 'drizzle-orm';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';

// GET /api/items - Search items with filters
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const status = searchParams.get('status');
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');

    let whereConditions = [];

    if (status) {
      whereConditions.push(eq(items.status, status as any));
    }

    if (category) {
      whereConditions.push(eq(items.category, category));
    }

    if (search) {
      whereConditions.push(
        or(
          like(items.description, `%${search}%`),
          like(items.color, `%${search}%`),
          like(items.brand, `%${search}%`),
          like(items.locationFound, `%${search}%`)
        )
      );
    }

    const offset = (page - 1) * limit;

    const whereClause = whereConditions.length > 0 
      ? and(...whereConditions) 
      : undefined;

    const [itemsList, totalCount] = await Promise.all([
      db.select({
        id: items.id,
        category: items.category,
        description: items.description,
        color: items.color,
        brand: items.brand,
        locationFound: items.locationFound,
        dateReported: items.dateReported,
        status: items.status,
        image: items.image,
        reportedByName: users.name,
        reportedByDepartment: users.department,
      })
      .from(items)
      .leftJoin(users, eq(items.reportedBy, users.id))
      .where(whereClause)
      .orderBy(desc(items.dateReported))
      .limit(limit)
      .offset(offset),

      db.select({ count: items.id })
        .from(items)
        .where(whereClause)
        .then(rows => rows.length)
    ]);

    return NextResponse.json({
      success: true,
      data: itemsList,
      pagination: {
        page,
        limit,
        total: totalCount,
        totalPages: Math.ceil(totalCount / limit),
      },
    });
  } catch (error) {
    console.error('Error fetching items:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch items' },
      { status: 500 }
    );
  }
}

// POST /api/items - Create new item (authenticated only)
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
    const {
      category,
      description,
      color,
      brand,
      locationFound,
      status,
      image,
    } = body;

    // Validate required fields
    if (!category || !description) {
      return NextResponse.json(
        { success: false, error: 'Category and description are required' },
        { status: 400 }
      );
    }

    // Get user ID from database
    const userRecords = await db.select().from(users).where(eq(users.email, session.user.email!)).limit(1);
    
    if (userRecords.length === 0) {
      return NextResponse.json(
        { success: false, error: 'User not found' },
        { status: 404 }
      );
    }

    const userId = userRecords[0].id;

    // Insert item using stored procedure would be ideal
    // For now, direct insert (Phase 2B will use stored procedures)
    const result = await db.insert(items).values({
      category,
      description,
      color: color || null,
      brand: brand || null,
      locationFound: locationFound || null,
      status: (status || 'Found') as any,
      reportedBy: userId,
      image: image || null,
    });

    return NextResponse.json({
      success: true,
      message: 'Item reported successfully',
      itemId: result.insertId,
    });
  } catch (error) {
    console.error('Error creating item:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create item' },
      { status: 500 }
    );
  }
}
