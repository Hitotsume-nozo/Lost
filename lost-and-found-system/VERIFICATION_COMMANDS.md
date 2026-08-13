# Weekly Verification Commands Guide

**Mapped to:** `GUIDE.md` (August 1 – November 30, 2026)  
**Team:** S. Sahil Soumen, Arnav Jain, Sharan Sharma  
**Repository:** https://github.com/Hitotsume-nozo/Lost

This document provides executable commands to verify each week's implementation. Run these during weekly reviews to demonstrate working functionality.

---

## Phase 1: Database Architecture (August 2026)

### Week 1 (Aug 1-7): Core Schema & Security Foundation
**Files:** `sql/schema/00_global_standards.sql`, `sql/schema/01_users_module.sql`, `sql/schema/02_categories_locations.sql`, `sql/schema/03_items_core.sql`, `sql/schema/04_claims_reports.sql`, `sql/schema/05_audit_security.sql`, `sql/schema/06_indexes_performance.sql`, `sql/schema/07_referential_integrity.sql`

**Verification Commands:**
```bash
# Execute all schema files
mysql -u root -p < sql/schema/00_global_standards.sql
mysql -u root -p < sql/schema/01_users_module.sql
mysql -u root -p < sql/schema/02_categories_locations.sql
mysql -u root -p < sql/schema/03_items_core.sql
mysql -u root -p < sql/schema/04_claims_reports.sql
mysql -u root -p < sql/schema/05_audit_security.sql
mysql -u root -p < sql/schema/06_indexes_performance.sql
mysql -u root -p < sql/schema/07_referential_integrity.sql

# Verify tables created
mysql -u root -p lost_and_found -e "SHOW TABLES;"

# Verify foreign keys (Sharan's contribution)
mysql -u root -p lost_and_found -e "SELECT TABLE_NAME, CONSTRAINT_NAME FROM information_schema.TABLE_CONSTRAINTS WHERE CONSTRAINT_TYPE='FOREIGN KEY';"

# Verify ENUMs (Sahil's contribution)
mysql -u root -p lost_and_found -e "SHOW COLUMNS FROM users WHERE Field='role';"

# Verify AI columns (Arnav's contribution)
mysql -u root -p lost_and_found -e "SHOW COLUMNS FROM items WHERE Field='embedding_vector' OR Field='metadata_json';"
```

**Expected Output:** 7 tables listed, 6+ foreign key constraints, ENUM type for role, VECTOR column in items.

---

### Week 2 (Aug 8-14): Stored Procedures & Business Logic
**Files:** `sql/procedures/01_user_auth.sql`, `sql/procedures/02_item_report.sql`, `sql/procedures/03_claim_submit.sql`, `sql/procedures/04_claim_review.sql`, `sql/procedures/05_search_items.sql`, `sql/procedures/06_notifications.sql`, `sql/procedures/07_admin_procedures.sql`

**Verification Commands:**
```bash
# Install all procedures
mysql -u root -p lost_and_found < sql/procedures/01_user_auth.sql
mysql -u root -p lost_and_found < sql/procedures/02_item_report.sql
mysql -u root -p lost_and_found < sql/procedures/03_claim_submit.sql
mysql -u root -p lost_and_found < sql/procedures/04_claim_review.sql
mysql -u root -p lost_and_found < sql/procedures/05_search_items.sql
mysql -u root -p lost_and_found < sql/procedures/06_notifications.sql
mysql -u root -p lost_and_found < sql/procedures/07_admin_procedures.sql

# List all procedures (Sahil, Arnav, Sharan contributions)
mysql -u root -p lost_and_found -e "SHOW PROCEDURE STATUS WHERE Db='lost_and_found';"

# Test sp_report_item (Arnav)
mysql -u root -p lost_and_found -e "CALL sp_report_item(1, 'Electronics', 'Test item', 'Black', 'Sony', 'Library', 'Found', NOW(), NULL);"

# Verify atomic insertion (check items, reports, audit_log)
mysql -u root -p lost_and_found -e "SELECT COUNT(*) AS item_count FROM items; SELECT COUNT(*) AS report_count FROM reports; SELECT COUNT(*) AS audit_count FROM audit_log;"
```

**Expected Output:** 7 procedures listed, item/report/audit counts all increment by 1.

---

### Week 3 (Aug 15-21): Triggers & Automation
**Files:** `sql/triggers/01_audit_trail.sql`, `sql/triggers/02_item_status_auto.sql`, `sql/triggers/03_prevent_duplicates.sql`, `sql/triggers/04_claim_lifecycle.sql`, `sql/triggers/05_expiration_handling.sql`, `sql/triggers/06_event_scheduler.sql`, `sql/triggers/07_security_events.sql`

**Verification Commands:**
```bash
# Install all triggers
mysql -u root -p lost_and_found < sql/triggers/01_audit_trail.sql
mysql -u root -p lost_and_found < sql/triggers/02_item_status_auto.sql
mysql -u root -p lost_and_found < sql/triggers/03_prevent_duplicates.sql
mysql -u root -p lost_and_found < sql/triggers/04_claim_lifecycle.sql
mysql -u root -p lost_and_found < sql/triggers/05_expiration_handling.sql
mysql -u root -p lost_and_found < sql/triggers/06_event_scheduler.sql
mysql -u root -p lost_and_found < sql/triggers/07_security_events.sql

# List all triggers (Sahil, Arnav, Sharan contributions)
mysql -u root -p lost_and_found -e "SHOW TRIGGERS;"

# Test auto-status trigger (Arnav) - approve a claim and verify item status changes
mysql -u root -p lost_and_found -e "UPDATE claims SET verification_status='Approved' WHERE id=1; SELECT status FROM items WHERE id=(SELECT item_id FROM claims WHERE id=1);"

# Verify audit log entry (Sahil)
mysql -u root -p lost_and_found -e "SELECT action, timestamp FROM audit_log ORDER BY id DESC LIMIT 1;"
```

**Expected Output:** 7 triggers listed, item status changes to 'Returned' automatically, new audit log entry created.

---

### Week 4 (Aug 22-28): Views & Data Abstraction
**Files:** `sql/views/01_public_search.sql`, `sql/views/02_claim_tracking.sql`, `sql/views/03_user_history.sql`, `sql/views/04_category_stats.sql`, `sql/views/05_lifecycle_view.sql`, `sql/views/06_admin_dashboard.sql`, `sql/views/07_security_audit_view.sql`

**Verification Commands:**
```bash
# Create all views
mysql -u root -p lost_and_found < sql/views/01_public_search.sql
mysql -u root -p lost_and_found < sql/views/02_claim_tracking.sql
mysql -u root -p lost_and_found < sql/views/03_user_history.sql
mysql -u root -p lost_and_found < sql/views/04_category_stats.sql
mysql -u root -p lost_and_found < sql/views/05_lifecycle_view.sql
mysql -u root -p lost_and_found < sql/views/06_admin_dashboard.sql
mysql -u root -p lost_and_found < sql/views/07_security_audit_view.sql

# List all views (Sahil, Arnav, Sharan contributions)
mysql -u root -p lost_and_found -e "SHOW FULL TABLES WHERE TABLE_TYPE LIKE '%VIEW%';"

# Test PII masking in public_search_view (Arnav)
mysql -u root -p lost_and_found -e "SELECT * FROM public_search_view LIMIT 5;"

# Test admin dashboard view (Sahil)
mysql -u root -p lost_and_found -e "SELECT * FROM admin_dashboard_view;"

# Test claim tracking view (Sharan)
mysql -u root -p lost_and_found -e "SELECT * FROM claim_tracking_view LIMIT 5;"
```

**Expected Output:** 7 views listed, public view shows no user emails/phones, admin view shows full stats.

---

### Week 5 (Aug 29-Sep 4): Seed Data & Performance Tuning
**Files:** `sql/seed/01_users_seed.sql`, `sql/seed/02_items_seed.sql`, `sql/seed/03_claims_seed.sql`, `sql/seed/04_categories_seed.sql`, `sql/seed/05_reports_seed.sql`, `sql/seed/06_audit_seed.sql`, `sql/seed/07_notifications_seed.sql`

**Verification Commands:**
```bash
# Load all seed data
mysql -u root -p lost_and_found < sql/seed/01_users_seed.sql
mysql -u root -p lost_and_found < sql/seed/02_items_seed.sql
mysql -u root -p lost_and_found < sql/seed/03_claims_seed.sql
mysql -u root -p lost_and_found < sql/seed/04_categories_seed.sql
mysql -u root -p lost_and_found < sql/seed/05_reports_seed.sql
mysql -u root -p lost_and_found < sql/seed/06_audit_seed.sql
mysql -u root -p lost_and_found < sql/seed/07_notifications_seed.sql

# Verify record counts (Sahil: users/audit, Arnav: items/categories, Sharan: claims/reports)
mysql -u root -p lost_and_found -e "SELECT 'users' AS table_name, COUNT(*) AS count FROM users UNION SELECT 'items', COUNT(*) FROM items UNION SELECT 'claims', COUNT(*) FROM claims UNION SELECT 'categories', COUNT(*) FROM categories;"

# Test search performance with Full-Text index (Arnav)
mysql -u root -p lost_and_found -e "EXPLAIN SELECT * FROM items WHERE MATCH(description) AGAINST('laptop');"

# Verify team members are seeded
mysql -u root -p lost_and_found -e "SELECT name, email FROM users WHERE email LIKE '%@thapar.edu' OR unionId IN ('1024030444', '1024030449', '1024030511');"
```

**Expected Output:** 25+ users, 500+ items, 1000+ claims, sub-10ms query time on Full-Text search.

---

## Phase 2: Web Application Development (September – October 2026)

### Week 6 (Sep 5-11): Project Scaffolding & Design System
**Files:** `web-app/package.json`, `web-app/tsconfig.json`, `web-app/.eslintrc.json`, `web-app/tailwind.config.ts`, `web-app/src/styles/globals.css`, `web-app/drizzle.config.ts`, `web-app/src/lib/db.ts`, `web-app/.env.local.example`

**Verification Commands:**
```bash
cd web-app

# Install dependencies (Sahil: package.json, tsconfig)
npm install

# Verify Tailwind theme colors match LaTeX doc (Arnav)
grep -A5 "colors:" tailwind.config.ts | grep -E "(inkNavy|sage|goldLeaf)"

# Test database connection (Sharan)
cp .env.local.example .env.local
# Edit .env.local with your DB credentials
npm run db:push

# Verify build succeeds
npm run build
```

**Expected Output:** Build succeeds with no errors, Tailwind config shows custom colors, database schema pushed successfully.

---

### Week 7 (Sep 12-18): Authentication System
**Files:** `web-app/src/lib/auth.ts`, `web-app/src/app/api/auth/[...nextauth]/route.ts`, `web-app/src/app/sign-in/page.tsx`, `web-app/src/components/forms/signin-form.tsx`, `web-app/src/app/sign-up/page.tsx`, `web-app/src/app/api/auth/register/route.ts`

**Verification Commands:**
```bash
cd web-app

# Start development server
npm run dev &

# Test sign-in page renders (Arnav)
curl http://localhost:3000/sign-in | grep -i "email"

# Test sign-up page renders (Sharan)
curl http://localhost:3000/sign-up | grep -i "password"

# Test registration API (Sharan)
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@thapar.edu","password":"test123","name":"Test User"}'

# Verify NextAuth configuration (Sahil)
grep -A10 "providers:" src/lib/auth.ts | grep -i "credentials"
```

**Expected Output:** Both pages render, registration returns success, credentials provider configured.

---

### Week 8 (Sep 19-25): Items Module – Browse & Search
**Files:** `web-app/src/app/api/items/route.ts`, `web-app/src/lib/services/itemService.ts`, `web-app/src/app/items/page.tsx`, `web-app/src/components/items/item-card.tsx`, `web-app/src/components/items/filter-sidebar.tsx`, `web-app/src/components/ui/pagination.tsx`

**Verification Commands:**
```bash
cd web-app

# Start server
npm run dev &

# Test items API endpoint (Sahil)
curl "http://localhost:3000/api/items?category=Electronics&status=Found" | jq '.items | length'

# Test filter combinations (Sharan)
curl "http://localhost:3000/api/items?category=Books&location=Library" | jq '.items[] | {description, location_found}'

# Verify responsive grid renders (Arnav)
curl http://localhost:3000/items | grep -i "grid"

# Test pagination
curl "http://localhost:3000/api/items?page=2&limit=10" | jq '.pagination'
```

**Expected Output:** API returns filtered results, pagination metadata present, grid layout detected.

---

### Week 9 (Sep 26-Oct 2): Items Module – Detail & Claims
**Files:** `web-app/src/app/api/claims/route.ts`, `web-app/src/lib/services/claimService.ts`, `web-app/src/app/items/[id]/page.tsx`, `web-app/src/components/items/image-gallery.tsx`, `web-app/src/components/claims/claim-form.tsx`, `web-app/src/components/ui/status-badge.tsx`

**Verification Commands:**
```bash
cd web-app

# Start server
npm run dev &

# Test item detail page (Arnav)
curl http://localhost:3000/items/1 | grep -i "description"

# Test claim submission API (Sahil)
curl -X POST http://localhost:3000/api/claims \
  -H "Content-Type: application/json" \
  -d '{"itemId":1,"userId":1,"proofDescription":"I own this item"}' | jq '.success'

# Test duplicate claim prevention (business rule)
curl -X POST http://localhost:3000/api/claims \
  -H "Content-Type: application/json" \
  -d '{"itemId":1,"userId":1,"proofDescription":"Duplicate claim"}' | jq '.error'

# Verify claim form component (Sharan)
grep -i "proof" src/components/claims/claim-form.tsx
```

**Expected Output:** Detail page loads, first claim succeeds, duplicate claim rejected with error message.

---

### Week 10 (Oct 3-9): User Dashboard
**Files:** `web-app/src/app/api/dashboard/route.ts`, `web-app/src/app/dashboard/page.tsx`, `web-app/src/components/dashboard/stats-cards.tsx`, `web-app/src/components/dashboard/claim-history.tsx`, `web-app/src/components/dashboard/notifications.tsx`

**Verification Commands:**
```bash
cd web-app

# Start server
npm run dev &

# Test dashboard API (Sahil)
curl -H "Authorization: Bearer YOUR_SESSION_TOKEN" http://localhost:3000/api/dashboard | jq '.stats'

# Verify stats cards render (Arnav)
curl http://localhost:3000/dashboard | grep -i "total claims"

# Test notifications component (Sharan)
curl http://localhost:3000/dashboard | grep -i "notification"

# Verify real-time data sync
curl -H "Authorization: Bearer YOUR_SESSION_TOKEN" http://localhost:3000/api/dashboard | jq '.recentActivity | length'
```

**Expected Output:** Dashboard API returns stats, claim history table renders, notifications visible.

---

### Week 11 (Oct 10-16): Admin Dashboard
**Files:** `web-app/src/app/api/admin/claims/route.ts`, `web-app/src/lib/middleware/admin-guard.ts`, `web-app/src/app/admin/page.tsx`, `web-app/src/components/admin/analytics-chart.tsx`, `web-app/src/components/admin/claim-review-table.tsx`, `web-app/src/components/admin/bulk-actions.tsx`

**Verification Commands:**
```bash
cd web-app

# Start server
npm run dev &

# Test admin-only access (Sahil)
curl -H "Authorization: Bearer NON_ADMIN_TOKEN" http://localhost:3000/api/admin/claims | jq '.error'

# Test admin approval workflow (Sharan)
curl -X POST http://localhost:3000/api/admin/claims \
  -H "Authorization: Bearer ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"claimId":1,"action":"approve"}' | jq '.success'

# Verify analytics chart renders (Arnav)
curl http://localhost:3000/admin | grep -i "chart"

# Verify trigger chain (approval → item status change)
mysql -u root -p lost_and_found -e "SELECT status FROM items WHERE id=(SELECT item_id FROM claims WHERE id=1);"
```

**Expected Output:** Non-admin users blocked, approval succeeds, item status updates to 'Returned'.

---

### Week 12 (Oct 17-23): Deployment & Dockerization
**Files:** `web-app/docker-compose.yml`, `web-app/Dockerfile`, `web-app/nginx.conf`, `web-app/.ssl/README.md`, `web-app/.github/workflows/deploy.yml`, `scripts/deploy.sh`

**Verification Commands:**
```bash
cd web-app

# Test Docker build (Sahil)
docker-compose build

# Verify Nginx config (Arnav)
cat nginx.conf | grep -A5 "server_name"

# Test CI/CD workflow syntax (Sharan)
cat .github/workflows/deploy.yml | head -20

# Run deployment script
chmod +x ../scripts/deploy.sh
../scripts/deploy.sh --dry-run
```

**Expected Output:** Docker builds successfully, Nginx config valid, GitHub Actions syntax correct.

---

## Phase 3: AI Integration (October – November 2026)

### Week 13 (Oct 24-30): Vector Embeddings & Storage
**Files:** `ai/migrations/01_add_vector_columns.sql`, `ai/embeddings/generate.py`, `ai/requirements.txt`, `ai/vector_store/indexer.py`, `ai/vector_store/config.py`

**Verification Commands:**
```bash
cd ai

# Install Python dependencies (Arnav)
pip install -r requirements.txt

# Run vector column migration (Sahil)
mysql -u root -p lost_and_found < migrations/01_add_vector_columns.sql

# Verify VECTOR column exists
mysql -u root -p lost_and_found -e "SHOW COLUMNS FROM items WHERE Field='embedding_vector';"

# Generate embeddings for seed items (Arnav)
python embeddings/generate.py --limit 10

# Verify vectors stored (Sharan)
mysql -u root -p lost_and_found -e "SELECT id, description, embedding_vector IS NOT NULL AS has_vector FROM items LIMIT 5;"
```

**Expected Output:** Migration succeeds, 10 embeddings generated, vectors stored in database.

---

### Week 14 (Oct 31-Nov 6): Semantic Search Engine
**Files:** `web-app/src/app/api/ai/search/route.ts`, `ai/search/query_processor.py`, `ai/search/ranking.py`, `web-app/src/components/search/ai-search-bar.tsx`, `web-app/src/components/search/result-highlight.tsx`

**Verification Commands:**
```bash
cd web-app

# Start server
npm run dev &

# Test semantic search API (Sahil)
curl -X POST http://localhost:3000/api/ai/search \
  -H "Content-Type: application/json" \
  -d '{"query":"red bag near library"}' | jq '.results | length'

# Compare vs keyword search (Arnav)
curl "http://localhost:3000/api/items?search=bag" | jq '.items | length'

# Test result highlighting (Sharan)
curl http://localhost:3000/items | grep -i "highlight"

# Test natural language query processing
curl -X POST http://localhost:3000/api/ai/search \
  -H "Content-Type: application/json" \
  -d '{"query":"something I lost in the cafeteria last week"}' | jq '.results[0].description'
```

**Expected Output:** Semantic search returns relevant results, highlighting works, natural language queries understood.

---

### Week 15 (Nov 7-13): Fraud Detection & Recommendations
**Files:** `web-app/src/app/api/ai/detect-fraud/route.ts`, `ai/fraud/detector.py`, `ai/fraud/models.py`, `ai/recommendations/engine.py`, `web-app/src/components/recommendations/suggestions.tsx`

**Verification Commands:**
```bash
cd ai

# Test fraud detection (Arnav)
python fraud/detector.py --user-id 1 --item-id 1

# Test recommendation engine (Sharan)
python recommendations/engine.py --user-id 1 --limit 5

# Test fraud API endpoint (Sahil)
cd ../web-app
curl -X POST http://localhost:3000/api/ai/detect-fraud \
  -H "Content-Type: application/json" \
  -d '{"userId":1,"itemId":1}' | jq '.riskScore'

# Verify suggestions UI renders
curl http://localhost:3000/dashboard | grep -i "you might have lost"
```

**Expected Output:** Fraud risk score returned, 5 recommendations generated, suggestions visible in UI.

---

### Week 16 (Nov 14-20): Auto-Categorization & Final Polish
**Files:** `web-app/src/app/api/ai/categorize/route.ts`, `ai/categorization/classifier.py`, `ai/categorization/categories.json`, `web-app/src/components/admin/ai-override.tsx`, `web-app/src/components/ui/ai-tooltip.tsx`

**Verification Commands:**
```bash
cd ai

# Test auto-categorization (Arnav)
python categorization/classifier.py --text "blue wireless headphones"

# Test categorization API (Sahil)
cd ../web-app
curl -X POST http://localhost:3000/api/ai/categorize \
  -H "Content-Type: application/json" \
  -d '{"description":"red leather wallet"}' | jq '.predictedCategory'

# Verify admin override UI (Sharan)
curl http://localhost:3000/admin | grep -i "ai-override"

# Test explanation tooltip
curl http://localhost:3000/items | grep -i "tooltip"
```

**Expected Output:** Category predicted with confidence score, admin can override, tooltips explain AI decisions.

---

### Week 17 (Nov 21-27): Testing & Documentation
**Files:** `web-app/__tests__/api/*.test.ts`, `web-app/jest.config.ts`, `web-app/e2e/*.spec.ts`, `web-app/a11y-report.md`, `docs/USER_GUIDE.md`, `docs/API_REFERENCE.md`, `docs/DEPLOYMENT.md`

**Verification Commands:**
```bash
cd web-app

# Run unit tests (Sahil)
npm test -- --coverage

# Run E2E tests (Arnav)
npx playwright test --reporter=list

# Generate accessibility report (Arnav)
npx pa11y-ci > a11y-report.md

# Verify documentation files exist (Sharan)
ls -la ../docs/*.md
```

**Expected Output:** All tests pass, coverage >80%, a11y report generated, 3+ documentation files present.

---

### Week 18 (Nov 28-30): Final Review & Launch Prep
**Files:** `scripts/load-test.sh`, `docs/FINAL_DEMO.md`

**Verification Commands:**
```bash
# Run load test (All Members)
chmod +x scripts/load-test.sh
./scripts/load-test.sh --users 100 --duration 60s

# Verify demo documentation (All Members)
cat docs/FINAL_DEMO.md | head -30

# Final system health check
mysql -u root -p lost_and_found -e "SELECT COUNT(*) AS total_items FROM items;"
cd web-app && npm run build
```

**Expected Output:** System handles 100 concurrent users, demo doc complete, build succeeds.

---

## Quick Reference: Team Member Contributions

| Member | Key Files to Verify |
|--------|---------------------|
| **Sahil** | Auth system, security views, admin APIs, fraud detection API, unit tests |
| **Arnav** | Items schema, Tailwind theme, search/full-text, embeddings, E2E tests |
| **Sharan** | Claims lifecycle, triggers, notifications, recommendations, documentation |

---

*Last Updated: August 13, 2026*  
*Maintained by: Hitotsume-Nozo*
