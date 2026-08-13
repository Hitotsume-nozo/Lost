import { mysqlTable, bigint, varchar, text, timestamp, enumType, json } from 'drizzle-orm/mysql-core';

export const users = mysqlTable('users', {
  id: bigint('id', { mode: 'number' }).primaryKey().autoincrement(),
  unionId: varchar('unionId', { length: 255 }).notNull().unique(),
  firstName: varchar('first_name', { length: 50 }),
  lastName: varchar('last_name', { length: 50 }),
  name: varchar('name', { length: 255 }),
  email: varchar('email', { length: 320 }),
  avatar: text('avatar'),
  role: enumType('role', ['user', 'admin']).notNull().default('user'),
  phone: varchar('phone', { length: 15 }),
  department: varchar('department', { length: 60 }),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow().onUpdateNow(),
  lastSignInAt: timestamp('lastSignInAt').notNull().defaultNow(),
});

export const items = mysqlTable('items', {
  id: bigint('id', { mode: 'number' }).primaryKey().autoincrement(),
  category: varchar('category', { length: 30 }).notNull(),
  description: text('description').notNull(),
  color: varchar('color', { length: 20 }),
  brand: varchar('brand', { length: 40 }),
  locationFound: varchar('location_found', { length: 80 }),
  dateReported: timestamp('date_reported').defaultNow(),
  status: enumType('item_status', ['Lost', 'Found', 'Claimed', 'Returned']).notNull().default('Found'),
  reportedBy: bigint('reported_by', { mode: 'number' }).notNull(),
  image: text('image'),
  embeddingVector: json('embedding_vector'),
  metadataJson: json('metadata_json'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

export const claims = mysqlTable('claims', {
  id: bigint('id', { mode: 'number' }).primaryKey().autoincrement(),
  userId: bigint('user_id', { mode: 'number' }).notNull(),
  itemId: bigint('item_id', { mode: 'number' }).notNull(),
  claimDate: timestamp('claim_date').defaultNow(),
  proofDescription: text('proof_description').notNull(),
  verificationStatus: enumType('claim_status', ['Pending', 'Approved', 'Rejected']).notNull().default('Pending'),
  aiFraudScore: json('ai_fraud_score'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

export const reports = mysqlTable('reports', {
  id: bigint('id', { mode: 'number' }).primaryKey().autoincrement(),
  userId: bigint('user_id', { mode: 'number' }).notNull(),
  reportType: enumType('report_type', ['Lost', 'Found']).notNull(),
  itemDesc: text('item_desc'),
  location: varchar('location', { length: 80 }),
  dateEvent: timestamp('date_event'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

export const auditLog = mysqlTable('audit_log', {
  id: bigint('id', { mode: 'number' }).primaryKey().autoincrement(),
  action: varchar('action', { length: 50 }).notNull(),
  claimId: bigint('claim_id', { mode: 'number' }),
  itemId: bigint('item_id', { mode: 'number' }),
  adminId: bigint('admin_id', { mode: 'number' }),
  details: text('details'),
  timestamp: timestamp('timestamp').notNull().defaultNow(),
  ipAddress: varchar('ip_address', { length: 45 }),
});

export const notifications = mysqlTable('notifications', {
  id: bigint('id', { mode: 'number' }).primaryKey().autoincrement(),
  userId: bigint('user_id', { mode: 'number' }).notNull(),
  title: varchar('title', { length: 255 }).notNull(),
  message: text('message').notNull(),
  type: enumType('notification_type', ['info', 'warning', 'success', 'error']).notNull(),
  isRead: timestamp('is_read'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

export const categories = mysqlTable('categories', {
  id: bigint('id', { mode: 'number' }).primaryKey().autoincrement(),
  name: varchar('name', { length: 50 }).notNull().unique(),
  description: text('description'),
  icon: varchar('icon', { length: 50 }),
  isActive: timestamp('is_active'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});
