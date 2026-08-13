import { db } from "@/lib/db";
import { items, categories } from "@/lib/schema";
import { desc, sql } from "drizzle-orm";

interface SearchFilters {
  category?: string;
  status?: string;
  location?: string;
  search?: string;
  page?: number;
  limit?: number;
}

export async function getItems(filters: SearchFilters = {}) {
  const {
    category,
    status,
    location,
    search,
    page = 1,
    limit = 12,
  } = filters;

  const offset = (page - 1) * limit;

  // Build WHERE conditions
  const conditions = [];
  
  if (category) {
    conditions.push(sql`items.category = ${category}`);
  }
  
  if (status) {
    conditions.push(sql`items.status = ${status}`);
  }
  
  if (location) {
    conditions.push(sql`items.location_found LIKE ${`%${location}%`}`);
  }
  
  if (search) {
    conditions.push(sql`
      (items.description LIKE ${`%${search}%`} 
       OR items.brand LIKE ${`%${search}%`} 
       OR items.color LIKE ${`%${search}%`})
    `);
  }

  // Get total count
  const countResult = await db
    .select({ count: sql<number>`count(*)` })
    .from(items)
    .where(conditions.length > 0 ? sql`${sql.join(conditions, sql` AND `)}` : undefined);
  
  const total = Number(countResult[0]?.count || 0);

  // Get items with category join
  const result = await db
    .select({
      id: items.id,
      category: items.category,
      description: items.description,
      color: items.color,
      brand: items.brand,
      location_found: items.location_found,
      date_reported: items.date_reported,
      status: items.status,
      image: items.image,
      categoryName: categories.name,
    })
    .from(items)
    .leftJoin(categories, sql`${items.category} = ${categories.slug}`)
    .where(conditions.length > 0 ? sql`${sql.join(conditions, sql` AND `)}` : undefined)
    .orderBy(desc(items.date_reported))
    .limit(limit)
    .offset(offset);

  return {
    items: result,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
}

export async function getItemById(id: number) {
  const result = await db
    .select({
      id: items.id,
      category: items.category,
      description: items.description,
      color: items.color,
      brand: items.brand,
      location_found: items.location_found,
      date_reported: items.date_reported,
      status: items.status,
      image: items.image,
      reported_by: items.reported_by,
      createdAt: items.createdAt,
      updatedAt: items.updatedAt,
      categoryName: categories.name,
    })
    .from(items)
    .leftJoin(categories, sql`${items.category} = ${categories.slug}`)
    .where(sql`${items.id} = ${id}`)
    .limit(1);

  return result[0] || null;
}

export async function getCategories() {
  return await db.select().from(categories).orderBy(categories.name);
}
