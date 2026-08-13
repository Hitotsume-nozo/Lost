# Implementation Guide: Centralized Campus Lost & Found System

**Author:** Hitotsume-Nozo  
**Timeline:** September 2024 – December 2024  
**Status:** Complete Implementation Available  

This guide provides a week-by-week breakdown of the project implementation. Each week focuses on specific files and milestones, ensuring visible progress and manageable development cycles. All source files are available in this repository; refer to the "Files to Complete" column to locate the exact implementation.

---

## 📅 Phase 1: Database Foundation (Weeks 1–5)
*Goal: Build a robust, normalized database with business logic encapsulated in stored procedures and triggers.*

| Week | Dates | Focus Area | Files to Complete | Visible Progress / Milestone |
| :--- | :--- | :--- | :--- | :--- |
| **1** | Sep 1–7 | **Schema Design** | `sql/schema/01_core_schema.sql` | ✅ 7 Tables created (Users, Items, Claims, Reports, Audit, Notifications, Categories). ER Diagram finalized. |
| **2** | Sep 8–14 | **Data Abstraction** | `sql/views/01_views.sql` | ✅ 7 Views created including `public_search_view` (PII masked) and `admin_dashboard_view`. |
| **3** | Sep 15–21 | **Performance Tuning** | `sql/indexes/01_indexes.sql` | ✅ 20+ Indexes applied. Full-text search enabled on `items.description`. Query latency <10ms. |
| **4** | Sep 22–28 | **Business Logic (SP)** | `sql/procedures/01_procedures.sql` | ✅ 7 Stored Procedures implemented (`sp_report_item`, `sp_submit_claim`, etc.). Atomic transactions verified. |
| **5** | Sep 29–Oct 5 | **Automation & Seeding** | `sql/triggers/01_triggers.sql`<br>`sql/seed/01_seed_data.sql` | ✅ 7 Triggers active (auto-status change, audit logging). Database seeded with 500+ test records. **Phase 1 Complete.** |

---

## 📅 Phase 2: Dynamic Web UI (Weeks 6–12)
*Goal: Develop a responsive, type-safe Next.js application connected to the database with role-based access.*

| Week | Dates | Focus Area | Files to Complete | Visible Progress / Milestone |
| :--- | :--- | :--- | :--- | :--- |
| **6** | Oct 6–12 | **Project Scaffolding** | `web-app/package.json`<br>`web-app/tailwind.config.ts`<br>`web-app/drizzle.config.ts` | ✅ Next.js 14 + TypeScript setup. Tailwind theme configured to match report colors. Drizzle ORM connected. |
| **7** | Oct 13–19 | **Auth System** | `web-app/src/lib/auth.ts`<br>`web-app/src/app/sign-in/page.tsx`<br>`web-app/src/app/sign-up/page.tsx` | ✅ Credentials provider working. Sign-in/Sign-up pages live. Session management active. |
| **8** | Oct 20–26 | **Items Module (Browse)** | `web-app/src/app/items/page.tsx`<br>`web-app/src/components/item-card.tsx` | ✅ Public search page with filters (Category, Status, Date). Responsive grid layout. |
| **9** | Oct 27–Nov 2 | **Items Module (Detail)** | `web-app/src/app/items/[id]/page.tsx`<br>`web-app/src/actions/claim-action.ts` | ✅ Item detail view. Claim submission form functional. Image gallery ready. |
| **10** | Nov 3–9 | **User Dashboard** | `web-app/src/app/dashboard/page.tsx`<br>`web-app/src/components/claim-history.tsx` | ✅ Users can view their claims, reports, and notifications. Status tracking live. |
| **11** | Nov 10–16 | **Admin Dashboard** | `web-app/src/app/admin/page.tsx`<br>`web-app/src/actions/review-action.ts` | ✅ Admin interface for approving/rejecting claims. Analytics charts rendered. |
| **12** | Nov 17–23 | **Polish & Deploy** | `web-app/src/components/theme-provider.tsx`<br>`web-app/.env.local` | ✅ Dark mode toggle. Environment variables secured. Vercel/Production deployment ready. **Phase 2 Complete.** |

---

## 📅 Phase 3: AI Integration (Weeks 13–16)
*Goal: Integrate intelligent features for semantic search, auto-categorization, fraud detection, and recommendations.*

| Week | Dates | Focus Area | Files to Complete | Visible Progress / Milestone |
| :--- | :--- | :--- | :--- | :--- |
| **13** | Nov 24–30 | **Vector Infrastructure** | `sql/schema/02_ai_extensions.sql`<br>`web-app/src/lib/ai/embeddings.ts` | ✅ `VECTOR(384)` columns added. Embedding generation utility created. Database ready for vectors. |
| **14** | Dec 1–7 | **Semantic Search** | `web-app/src/app/api/ai/search/route.ts`<br>`web-app/src/components/ai-search-bar.tsx` | ✅ Natural language search implemented ("blue backpack near library"). Hybrid text+vector results. |
| **15** | Dec 8–14 | **Intelligence Layer** | `web-app/src/app/api/ai/categorize/route.ts`<br>`web-app/src/app/api/ai/detect-fraud/route.ts` | ✅ Auto-categorization on item report. Fraud detection flags suspicious claims with risk scores. |
| **16** | Dec 15–21 | **Recommendations & Final** | `web-app/src/app/api/ai/recommendations/route.ts`<br>`README.md` (Final Update) | ✅ "You might have lost this" engine active. **Full System Complete.** Documentation finalized. |

---

## 📂 File Location Reference

Use this quick reference to find the implementation code for each milestone:

### Database (SQL)
- **Schema:** `/sql/schema/01_core_schema.sql`
- **Views:** `/sql/views/01_views.sql`
- **Indexes:** `/sql/indexes/01_indexes.sql`
- **Procedures:** `/sql/procedures/01_procedures.sql`
- **Triggers:** `/sql/triggers/01_triggers.sql`
- **Seed Data:** `/sql/seed/01_seed_data.sql`
- **AI Extensions:** `/sql/schema/02_ai_extensions.sql`

### Web Application (Next.js)
- **Config:** `/web-app/tailwind.config.ts`, `/web-app/drizzle.config.ts`
- **Lib/Utils:** `/web-app/src/lib/db.ts`, `/web-app/src/lib/auth.ts`, `/web-app/src/lib/ai/`
- **Pages:**
  - Auth: `/web-app/src/app/sign-in/`, `/web-app/src/app/sign-up/`
  - Items: `/web-app/src/app/items/`, `/web-app/src/app/items/[id]/`
  - Dashboards: `/web-app/src/app/dashboard/`, `/web-app/src/app/admin/`
- **API Routes:** `/web-app/src/app/api/ai/` (search, categorize, detect-fraud, recommendations)
- **Components:** `/web-app/src/components/` (ItemCard, ClaimHistory, AISearchBar, etc.)

---

## 🚀 How to Run

### Database Setup
```bash
mysql -u root -p < sql/schema/01_core_schema.sql
mysql -u root -p < sql/views/01_views.sql
mysql -u root -p < sql/indexes/01_indexes.sql
mysql -u root -p < sql/procedures/01_procedures.sql
mysql -u root -p < sql/triggers/01_triggers.sql
mysql -u root -p < sql/seed/01_seed_data.sql
```

### Web App Setup
```bash
cd web-app
npm install
cp .env.local.example .env.local
# Edit .env.local with your DB credentials
npm run dev
```

---

**Project Status:** ✅ Complete  
**Last Updated:** December 2024  
**Repository:** https://github.com/Hitotsume-nozo/Lost
