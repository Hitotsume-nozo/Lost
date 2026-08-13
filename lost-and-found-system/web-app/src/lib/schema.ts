import { mysqlTable, bigint, varchar, text, timestamp, mysqlEnum, index } from 'drizzle-orm/mysql-core';

// Users table - core identity and role management
export const users = mysqlTable('users', {
  id: bigint('id', { mode: 'number' }).autoincrement().primaryKey(),
  unionId: varchar('unionId', { length: 255 }).notNull().unique(),
  firstName: varchar('first_name', { length: 50 }),
  lastName: varchar('last_name', { length: 50 }),
  name: varchar('name', { length: 255 }),
  email: varchar('email', { length: 320 }),
  avatar: text('avatar'),
  role: mysqlEnum('role', ['user', 'admin']).notNull().default('user'),
  phone: varchar('phone', { length: 15 }),
  department: varchar('department', { length: 60 }),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow().onUpdateNow(),
  lastSignInAt: timestamp('lastSignInAt').notNull().defaultNow(),
}, (table) => ({
  idxUnionId: index('idx_union_id').on(table.unionId),
  idxEmail: index('idx_email').on(table.email),
  idxRole: index('idx_role').on(table.role),
}));

// Categories table for item classification
export const categories = mysqlTable('categories', {
  id: bigint('id', { mode: 'number' }).autoincrement().primaryKey(),
  name: varchar('name', { length: 50 }).notNull().unique(),
  description: text('description'),
  icon: varchar('icon', { length: 50 }),
  createdAt: timestamp('created_at').notNull().defaultNow(),
}, (table) => ({
  idxName: index('idx_category_name').on(table.name),
}));

// Items table - lost and found item registry
export const items = mysqlTable('items', {
  id: bigint('id', { mode: 'number' }).autoincrement().primaryKey(),
  category: varchar('category', { length: 30 }).notNull(),
  categoryId: bigint('category_id', { mode: 'number' }).references(() => categories.id),
  description: text('description').notNull(),
  color: varchar('color', { length: 20 }),
  brand: varchar('brand', { length: 40 }),
  locationFound: varchar('location_found', { length: 80 }),
  dateReported: timestamp('date_reported').defaultNow(),
  status: mysqlEnum('status', ['Lost', 'Found', 'Claimed', 'Returned']).notNull().default('Found'),
  reportedBy: bigint('reported_by', { mode: 'number' }).notNull().references(() => users.id),
  image: text('image'),
  embeddingVector: text('embedding_vector'), // AI headroom: store vector as JSON string
  metadataJson: text('metadata_json'), // AI headroom: additional ML metadata
  createdAt: timestamp('created_at').notNull().defaultNow(),
}, (table) => ({
  idxStatus: index('idx_status').on(table.status),
  idxCategory: index('idx_category').on(table.category),
  idxLocation: index('idx_location').on(table.locationFound),
  idxDateReported: index('idx_date_reported').on(table.dateReported),
  idxReportedBy: index('idx_reported_by').on(table.reportedBy),
  fullTextDesc: index('ft_description').on(table.description),
}));

// Claims table - ownership verification pipeline
export const claims = mysqlTable('claims', {
  id: bigint('id', { mode: 'number' }).autoincrement().primaryKey(),
  userId: bigint('user_id', { mode: 'number' }).notNull().references(() => users.id),
  itemId: bigint('item_id', { mode: 'number' }).notNull().references(() => items.id),
  claimDate: timestamp('claim_date').defaultNow(),
  proofDescription: text('proof_description').notNull(),
  verificationStatus: mysqlEnum('verification_status', ['Pending', 'Approved', 'Rejected']).notNull().default('Pending'),
  reviewedBy: bigint('reviewed_by', { mode: 'number' }).references(() => users.id),
  reviewedAt: timestamp('reviewed_at'),
  rejectionReason: text('rejection_reason'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
}, (table) => ({
  idxUserId: index('idx_claims_user').on(table.userId),
  idxItemId: index('idx_claims_item').on(table.itemId),
  idxStatus: index('idx_claim_status').on(table.verificationStatus),
  idxClaimDate: index('idx_claim_date').on(table.claimDate),
  uniqueUserItem: index('idx_unique_user_item').on(table.userId, table.itemId),
}));

// Reports table - historical snapshots of lost/found events
export const reports = mysqlTable('reports', {
  id: bigint('id', { mode: 'number' }).autoincrement().primaryKey(),
  userId: bigint('user_id', { mode: 'number' }).notNull().references(() => users.id),
  reportType: mysqlEnum('report_type', ['Lost', 'Found']).notNull(),
  itemDesc: text('item_desc'),
  location: varchar('location', { length: 80 }),
  dateEvent: timestamp('date_event'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
}, (table) => ({
  idxUserId: index('idx_reports_user').on(table.userId),
  idxType: index('idx_report_type').on(table.reportType),
  idxDateEvent: index('idx_date_event').on(table.dateEvent),
}));

// Audit log table - immutable record of critical actions
export const auditLog = mysqlTable('audit_log', {
  id: bigint('id', { mode: 'number' }).autoincrement().primaryKey(),
  action: varchar('action', { length: 50 }).notNull(),
  claimId: bigint('claim_id', { mode: 'number' }).references(() => claims.id),
  itemId: bigint('item_id', { mode: 'number' }).references(() => items.id),
  adminId: bigint('admin_id', { mode: 'number' }).references(() => users.id),
  details: text('details'),
  ipAddress: varchar('ip_address', { length: 45 }), // For security tracking
  timestamp: timestamp('timestamp').notNull().defaultNow(),
}, (table) => ({
  idxAction: index('idx_audit_action').on(table.action),
  idxClaimId: index('idx_audit_claim').on(table.claimId),
  idxItemId: index('idx_audit_item').on(table.itemId),
  idxTimestamp: index('idx_audit_timestamp').on(table.timestamp),
}));

// Notifications table - user notifications system
export const notifications = mysqlTable('notifications', {
  id: bigint('id', { mode: 'number' }).autoincrement().primaryKey(),
  userId: bigint('user_id', { mode: 'number' }).notNull().references(() => users.id),
  title: varchar('title', { length: 255 }).notNull(),
  message: text('message').notNull(),
  type: mysqlEnum('type', ['info', 'success', 'warning', 'error']).notNull().default('info'),
  isRead: mysqlEnum('is_read', ['read', 'unread']).notNull().default('unread'),
  relatedEntityType: varchar('related_entity_type', { length: 50 }), // 'item', 'claim', etc.
  relatedEntityId: bigint('related_entity_id', { mode: 'number' }),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  readAt: timestamp('read_at'),
}, (table) => ({
  idxUserId: index('idx_notifications_user').on(table.userId),
  idxIsRead: index('idx_is_read').on(table.isRead),
  idxCreatedAt: index('idx_notification_created').on(table.createdAt),
}));

// Type exports for use in application
export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type Item = typeof items.$inferSelect;
export type NewItem = typeof items.$inferInsert;
export type Claim = typeof claims.$inferSelect;
export type NewClaim = typeof claims.$inferInsert;
export type Report = typeof reports.$inferSelect;
export type NewReport = typeof reports.$inferInsert;
export type AuditLog = typeof auditLog.$inferSelect;
export type NewAuditLog = typeof auditLog.$inferInsert;
export type Notification = typeof notifications.$inferSelect;
export type NewNotification = typeof notifications.$inferInsert;
export type Category = typeof categories.$inferSelect;
export type NewCategory = typeof categories.$inferInsert;
