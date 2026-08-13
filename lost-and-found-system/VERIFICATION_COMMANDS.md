# Weekly Verification Guide

This document provides step-by-step commands to verify the functionality of each week's implementation as outlined in `GUIDE.md`. Run these commands to demonstrate working progress for your weekly reviews.

---

## Phase 1: Database Foundation (Weeks 1-5)

### Week 1 (August 3-9, 2026) - Core Schema
**Files:** `sql/schema/01_core_schema.sql`

**Verification Command:**
```bash
mysql -u root -p lost_and_found < sql/schema/01_core_schema.sql && \
mysql -u root -p lost_and_found -e "SHOW TABLES;"
```
**Expected Output:** List of core tables (`users`, `items`, `claims`, etc.)

---

### Week 2 (August 10-16, 2026) - Views & Indexes
**Files:** `sql/views/01_views.sql`, `sql/indexes/01_indexes.sql`

**Verification Command:**
```bash
mysql -u root -p lost_and_found < sql/views/01_views.sql && \
mysql -u root -p lost_and_found < sql/indexes/01_indexes.sql && \
mysql -u root -p lost_and_found -e "SHOW INDEX FROM items; SHOW CREATE VIEW public_search_view;"
```
**Expected Output:** Index details and view definition confirmation.

---

### Week 3 (August 17-23, 2026) - Stored Procedures
**Files:** `sql/procedures/01_procedures.sql`

**Verification Command:**
```bash
mysql -u root -p lost_and_found < sql/procedures/01_procedures.sql && \
mysql -u root -p lost_and_found -e "SHOW PROCEDURE STATUS WHERE Db='lost_and_found';"
```
**Expected Output:** List of created procedures (`sp_report_item`, `sp_submit_claim`, etc.)

---

### Week 4 (August 24-30, 2026) - Triggers & Automation
**Files:** `sql/triggers/01_triggers.sql`

**Verification Command:**
```bash
mysql -u root -p lost_and_found < sql/triggers/01_triggers.sql && \
mysql -u root -p lost_and_found -e "SHOW TRIGGERS;"
```
**Test Trigger Functionality:**
```bash
mysql -u root -p lost_and_found -e "CALL sp_submit_claim(1, 1, 'Test proof'); SELECT * FROM audit_log LIMIT 1;"
```
**Expected Output:** Trigger list and a new audit log entry generated automatically.

---

### Week 5 (August 31 - September 6, 2026) - Seed Data & Full Integration
**Files:** `sql/seed/01_seed_data.sql`

**Verification Command:**
```bash
mysql -u root -p lost_and_found < sql/seed/01_seed_data.sql && \
mysql -u root -p lost_and_found -e "SELECT COUNT(*) as user_count FROM users; SELECT COUNT(*) as item_count FROM items;"
```
**Expected Output:** Non-zero counts for users and items (e.g., 25 users, 30 items).

---

## Phase 2: Web Application Development (Weeks 6-12)

### Week 6 (September 7-13, 2026) - Project Setup
**Files:** `web-app/package.json`, `web-app/tailwind.config.ts`

**Verification Command:**
```bash
cd web-app && npm install && npm run build
```
**Expected Output:** Successful build with no errors, `dist/` folder created.

---

### Week 7 (September 14-20, 2026) - Authentication UI
**Files:** `web-app/src/app/sign-in/page.tsx`, `web-app/src/app/sign-up/page.tsx`

**Verification Command:**
```bash
cd web-app && npm run dev &
sleep 5 && curl -I http://localhost:3000/sign-in | head -n 1
```
**Expected Output:** HTTP/1.1 200 OK for `/sign-in`.

---

### Week 8 (September 21-27, 2026) - Items Browse Interface
**Files:** `web-app/src/app/items/page.tsx`, `web-app/src/lib/items.service.ts`

**Verification Command:**
```bash
curl http://localhost:3000/api/items?limit=5 | jq '.items | length'
```
**Expected Output:** `5` (Returns 5 items from the database).

---

### Week 9 (September 28 - October 4, 2026) - Item Details & Claims
**Files:** `web-app/src/app/items/[id]/page.tsx`, `web-app/src/app/api/claims/route.ts`

**Verification Command:**
```bash
curl -X POST http://localhost:3000/api/claims \
  -H "Content-Type: application/json" \
  -d '{"itemId": 1, "proof": "I lost this yesterday"}' | jq '.success'
```
**Expected Output:** `true` (Claim submitted successfully).

---

### Week 10 (October 5-11, 2026) - User Dashboard
**Files:** `web-app/src/app/dashboard/user/page.tsx`

**Verification Command:**
```bash
curl http://localhost:3000/api/dashboard/user \
  -H "Authorization: Bearer <test_token>" | jq '.claims | length'
```
**Expected Output:** Number of claims associated with the test user.

---

### Week 11 (October 12-18, 2026) - Admin Dashboard
**Files:** `web-app/src/app/dashboard/admin/page.tsx`, `web-app/src/app/api/admin/claims/route.ts`

**Verification Command:**
```bash
curl http://localhost:3000/api/admin/stats | jq '.pending_claims'
```
**Expected Output:** Number of pending claims awaiting approval.

---

### Week 12 (October 19-25, 2026) - Deployment Ready
**Files:** `web-app/Dockerfile`, `web-app/docker-compose.yml`

**Verification Command:**
```bash
cd web-app && docker-compose up -d && sleep 10 && curl -I http://localhost:3000 | head -n 1
```
**Expected Output:** HTTP/1.1 200 OK from the Docker container.

---

## Phase 3: AI Integration (Weeks 13-16)

### Week 13 (October 26 - November 1, 2026) - Vector Search Setup
**Files:** `web-app/src/lib/ai/vector.service.ts`

**Verification Command:**
```bash
curl -X POST http://localhost:3000/api/ai/search \
  -H "Content-Type: application/json" \
  -d '{"query": "blue backpack"}' | jq '.results | length'
```
**Expected Output:** List of semantically similar items.

---

### Week 14 (November 2-8, 2026) - Auto-Categorization
**Files:** `web-app/src/lib/ai/categorizer.service.ts`

**Verification Command:**
```bash
curl -X POST http://localhost:3000/api/ai/categorize \
  -H "Content-Type: application/json" \
  -d '{"description": "Wireless headphones with noise cancellation"}' | jq '.category'
```
**Expected Output:** `"Electronics"` (or relevant category).

---

### Week 15 (November 9-15, 2026) - Fraud Detection
**Files:** `web-app/src/lib/ai/fraud.service.ts`

**Verification Command:**
```bash
curl -X POST http://localhost:3000/api/ai/detect-fraud \
  -H "Content-Type: application/json" \
  -d '{"userId": 1, "itemId": 1}' | jq '.risk_level'
```
**Expected Output:** `"low"`, `"medium"`, or `"high"`.

---

### Week 16 (November 16-22, 2026) - Recommendations Engine
**Files:** `web-app/src/lib/ai/recommendation.service.ts`

**Verification Command:**
```bash
curl http://localhost:3000/api/ai/recommendations?userId=1 | jq '.recommendations | length'
```
**Expected Output:** List of recommended items for the user.

---

## Phase 4: Polish & Launch (Weeks 17-22)

### Week 17-21 (November 23 - December 27, 2026) - Testing & Docs
**Files:** `tests/`, `docs/`

**Verification Command:**
```bash
npm run test:coverage
```
**Expected Output:** Coverage report showing >80% test coverage.

---

### Week 22 (December 28-31, 2026) - Final Production Build
**Files:** All

**Verification Command:**
```bash
docker-compose -f docker-compose.prod.yml up -d && \
curl -I https://your-domain.com | head -n 1
```
**Expected Output:** HTTP/1.1 200 OK from production server.

---

## Troubleshooting Tips

- **Database Connection Errors:** Ensure MySQL is running (`sudo systemctl status mysql`).
- **Port Conflicts:** Change port in `web-app/.env.local` if 3000 is busy.
- **Missing Dependencies:** Run `npm install` or `pip install -r requirements.txt` again.
- **Permission Issues:** Use `chmod +x script.sh` for shell scripts.

---

*Last Updated: August 1, 2026*
*Author: Hitotsume-Nozo*
