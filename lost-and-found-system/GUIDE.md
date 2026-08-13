# Implementation Guide: Centralized Campus Lost & Found System

## Project Timeline: August 1, 2026 – November 30, 2026
**Team Members:** S. Sahil Soumen, Arnav Jain, Sharan Sharma  
**Repository:** https://github.com/Hitotsume-nozo/Lost  
**Author:** Hitotsume-Nozo

---

## Phase 1: Database Architecture (August 2026)

### Week 1: Core Schema & Security Foundation (Aug 1 – Aug 7)
| Member | Responsibilities | Files Delivered |
|--------|-----------------|-----------------|
| **Sahil** | User identity, security enums, audit framework | `sql/schema/00_global_standards.sql`, `sql/schema/01_users_module.sql`, `sql/schema/05_audit_security.sql` |
| **Arnav** | Category/location hierarchies, items table with AI columns | `sql/schema/02_categories_locations.sql`, `sql/schema/03_items_core.sql`, `sql/schema/06_indexes_performance.sql` (Part A) |
| **Sharan** | Claims/reports lifecycle, foreign key integrity | `sql/schema/04_claims_reports.sql`, `sql/schema/07_referential_integrity.sql`, `sql/schema/06_indexes_performance.sql` (Part B) |

**Collaboration Checkpoint:** Merge all schema files; verify FK constraints between users→items→claims.

---

### Week 2: Stored Procedures & Business Logic (Aug 8 – Aug 14)
| Member | Responsibilities | Files Delivered |
|--------|-----------------|-----------------|
| **Sahil** | User authentication procedures, admin access control | `sql/procedures/01_user_auth.sql`, `sql/procedures/07_admin_procedures.sql` |
| **Arnav** | Item reporting, search procedures with pagination | `sql/procedures/02_item_report.sql`, `sql/procedures/05_search_items.sql` |
| **Sharan** | Claim submission, review workflows, notification system | `sql/procedures/03_claim_submit.sql`, `sql/procedures/04_claim_review.sql`, `sql/procedures/06_notifications.sql` |

**Collaboration Checkpoint:** Test procedure transactions; ensure atomicity across item→claim→audit tables.

---

### Week 3: Triggers & Automation (Aug 15 – Aug 21)
| Member | Responsibilities | Files Delivered |
|--------|-----------------|-----------------|
| **Sahil** | Audit logging triggers, security event tracking | `sql/triggers/01_audit_trail.sql`, `sql/triggers/07_security_events.sql` |
| **Arnav** | Item status automation, duplicate prevention | `sql/triggers/02_item_status_auto.sql`, `sql/triggers/03_prevent_duplicates.sql` |
| **Sharan** | Claim lifecycle triggers, expiration handling, scheduled events | `sql/triggers/04_claim_lifecycle.sql`, `sql/triggers/05_expiration_handling.sql`, `sql/triggers/06_event_scheduler.sql` |

**Collaboration Checkpoint:** Verify trigger execution order; test concurrent claim scenarios.

---

### Week 4: Views & Data Abstraction (Aug 22 – Aug 28)
| Member | Responsibilities | Files Delivered |
|--------|-----------------|-----------------|
| **Sahil** | Admin dashboards, security views | `sql/views/06_admin_dashboard.sql`, `sql/views/07_security_audit_view.sql` |
| **Arnav** | Public search view, category statistics | `sql/views/01_public_search.sql`, `sql/views/04_category_stats.sql` |
| **Sharan** | Claim tracking, user history views | `sql/views/02_claim_tracking.sql`, `sql/views/03_user_history.sql`, `sql/views/05_lifecycle_view.sql` |

**Collaboration Checkpoint:** Ensure PII masking in public views; validate join performance.

---

### Week 5: Seed Data & Performance Tuning (Aug 29 – Sep 4)
| Member | Responsibilities | Files Delivered |
|--------|-----------------|-----------------|
| **Sahil** | Admin/moderator seed users, security test data | `sql/seed/01_users_seed.sql`, `sql/seed/06_audit_seed.sql` |
| **Arnav** | Item inventory seed (500+ items), category distribution | `sql/seed/02_items_seed.sql`, `sql/seed/04_categories_seed.sql` |
| **Sharan** | Claims/reports seed data, notification templates | `sql/seed/03_claims_seed.sql`, `sql/seed/05_reports_seed.sql`, `sql/seed/07_notifications_seed.sql` |

**Deliverable:** Complete database with realistic test data, ready for web integration.

---

## Phase 2: Web Application Development (September – October 2026)

### Week 6: Project Scaffolding & Design System (Sep 5 – Sep 11)
| Member | Responsibilities | Files Delivered |
|--------|-----------------|-----------------|
| **Sahil** | Next.js setup, TypeScript config, ESLint rules | `web-app/package.json`, `web-app/tsconfig.json`, `web-app/.eslintrc.json` |
| **Arnav** | Tailwind theme, color tokens matching LaTeX doc | `web-app/tailwind.config.ts`, `web-app/src/styles/globals.css` |
| **Sharan** | Drizzle ORM setup, database connection pooling | `web-app/drizzle.config.ts`, `web-app/src/lib/db.ts`, `web-app/.env.local.example` |

**Collaboration Checkpoint:** Verify build pipeline; test database connectivity.

---

### Week 7: Authentication System (Sep 12 – Sep 18)
| Member | Responsibilities | Files Delivered |
|--------|-----------------|-----------------|
| **Sahil** | NextAuth credentials provider, JWT strategy | `web-app/src/lib/auth.ts`, `web-app/src/app/api/auth/[...nextauth]/route.ts` |
| **Arnav** | Sign-in page UI, form validation | `web-app/src/app/sign-in/page.tsx`, `web-app/src/components/forms/signin-form.tsx` |
| **Sharan** | Sign-up page, registration API, email verification | `web-app/src/app/sign-up/page.tsx`, `web-app/src/app/api/auth/register/route.ts` |

**Collaboration Checkpoint:** End-to-end login flow; role-based redirect (user vs admin).

---

### Week 8: Items Module – Browse & Search (Sep 19 – Sep 25)
| Member | Responsibilities | Files Delivered |
|--------|-----------------|-----------------|
| **Sahil** | Server-side search API, filter logic | `web-app/src/app/api/items/route.ts`, `web-app/src/lib/services/itemService.ts` |
| **Arnav** | Items grid layout, responsive cards | `web-app/src/app/items/page.tsx`, `web-app/src/components/items/item-card.tsx` |
| **Sharan** | Sidebar filters, category dropdown, pagination | `web-app/src/components/items/filter-sidebar.tsx`, `web-app/src/components/ui/pagination.tsx` |

**Collaboration Checkpoint:** Test search performance with 500+ items; verify filter combinations.

---

### Week 9: Items Module – Detail & Claims (Sep 26 – Oct 2)
| Member | Responsibilities | Files Delivered |
|--------|-----------------|-----------------|
| **Sahil** | Claim submission API, validation logic | `web-app/src/app/api/claims/route.ts`, `web-app/src/lib/services/claimService.ts` |
| **Arnav** | Item detail page, image gallery | `web-app/src/app/items/[id]/page.tsx`, `web-app/src/components/items/image-gallery.tsx` |
| **Sharan** | Claim form modal, proof upload, status badges | `web-app/src/components/claims/claim-form.tsx`, `web-app/src/components/ui/status-badge.tsx` |

**Collaboration Checkpoint:** Test claim workflow; verify business rules (no duplicate claims).

---

### Week 10: User Dashboard (Oct 3 – Oct 9)
| Member | Responsibilities | Files Delivered |
|--------|-----------------|-----------------|
| **Sahil** | Dashboard data API, aggregation queries | `web-app/src/app/api/dashboard/route.ts` |
| **Arnav** | Dashboard layout, stats cards, recent activity | `web-app/src/app/dashboard/page.tsx`, `web-app/src/components/dashboard/stats-cards.tsx` |
| **Sharan** | Claim history table, notification center | `web-app/src/components/dashboard/claim-history.tsx`, `web-app/src/components/dashboard/notifications.tsx` |

**Collaboration Checkpoint:** Verify real-time data sync; test notification read/unread states.

---

### Week 11: Admin Dashboard (Oct 10 – Oct 16)
| Member | Responsibilities | Files Delivered |
|--------|-----------------|-----------------|
| **Sahil** | Admin-only API endpoints, RBAC middleware | `web-app/src/app/api/admin/claims/route.ts`, `web-app/src/lib/middleware/admin-guard.ts` |
| **Arnav** | Admin layout, analytics charts | `web-app/src/app/admin/page.tsx`, `web-app/src/components/admin/analytics-chart.tsx` |
| **Sharan** | Claim approval interface, bulk actions | `web-app/src/components/admin/claim-review-table.tsx`, `web-app/src/components/admin/bulk-actions.tsx` |

**Collaboration Checkpoint:** Test admin-only access; verify approval→trigger chain updates item status.

---

### Week 12: Deployment & Dockerization (Oct 17 – Oct 23)
| Member | Responsibilities | Files Delivered |
|--------|-----------------|-----------------|
| **Sahil** | Docker Compose setup, multi-service orchestration | `web-app/docker-compose.yml`, `web-app/Dockerfile` |
| **Arnav** | Nginx reverse proxy, SSL configuration | `web-app/nginx.conf`, `web-app/.ssl/README.md` |
| **Sharan** | CI/CD pipeline, GitHub Actions workflow | `web-app/.github/workflows/deploy.yml`, `scripts/deploy.sh` |

**Deliverable:** Production-ready deployment with one-command setup.

---

## Phase 3: AI Integration (October – November 2026)

### Week 13: Vector Embeddings & Storage (Oct 24 – Oct 30)
| Member | Responsibilities | Files Delivered |
|--------|-----------------|-----------------|
| **Sahil** | Vector column migration, MySQL VECTOR type setup | `ai/migrations/01_add_vector_columns.sql` |
| **Arnav** | Embedding generation script (sentence-transformers) | `ai/embeddings/generate.py`, `ai/requirements.txt` |
| **Sharan** | Vector storage optimization, indexing strategy | `ai/vector_store/indexer.py`, `ai/vector_store/config.py` |

**Collaboration Checkpoint:** Generate embeddings for 500 seed items; verify cosine similarity queries.

---

### Week 14: Semantic Search Engine (Oct 31 – Nov 6)
| Member | Responsibilities | Files Delivered |
|--------|-----------------|-----------------|
| **Sahil** | Semantic search API endpoint, hybrid ranking | `web-app/src/app/api/ai/search/route.ts` |
| **Arnav** | Query processor, natural language parsing | `ai/search/query_processor.py`, `ai/search/ranking.py` |
| **Sharan** | Frontend search bar with AI toggle, result highlighting | `web-app/src/components/search/ai-search-bar.tsx`, `web-app/src/components/search/result-highlight.tsx` |

**Collaboration Checkpoint:** Test natural language queries ("red backpack near library"); compare vs keyword search.

---

### Week 15: Fraud Detection & Recommendations (Nov 7 – Nov 13)
| Member | Responsibilities | Files Delivered |
|--------|-----------------|-----------------|
| **Sahil** | Fraud detection API, risk scoring | `web-app/src/app/api/ai/detect-fraud/route.ts` |
| **Arnav** | Duplicate claim detector, anomaly detection model | `ai/fraud/detector.py`, `ai/fraud/models.py` |
| **Sharan** | Recommendation engine, "you might have lost this" feature | `ai/recommendations/engine.py`, `web-app/src/components/recommendations/suggestions.tsx` |

**Collaboration Checkpoint:** Test fraud alerts on duplicate claims; verify recommendation accuracy.

---

### Week 16: Auto-Categorization & Final Polish (Nov 14 – Nov 20)
| Member | Responsibilities | Files Delivered |
|--------|-----------------|-----------------|
| **Sahil** | Auto-categorization API, confidence thresholds | `web-app/src/app/api/ai/categorize/route.ts` |
| **Arnav** | Zero-shot classifier, category mapping | `ai/categorization/classifier.py`, `ai/categorization/categories.json` |
| **Sharan** | Admin UI for AI overrides, explanation tooltips | `web-app/src/components/admin/ai-override.tsx`, `web-app/src/components/ui/ai-tooltip.tsx` |

**Collaboration Checkpoint:** Test auto-categorization on new items; allow manual override.

---

### Week 17: Testing & Documentation (Nov 21 – Nov 27)
| Member | Responsibilities | Files Delivered |
|--------|-----------------|-----------------|
| **Sahil** | Unit tests for API endpoints, integration tests | `web-app/__tests__/api/*.test.ts`, `web-app/jest.config.ts` |
| **Arnav** | E2E tests with Playwright, accessibility audit | `web-app/e2e/*.spec.ts`, `web-app/a11y-report.md` |
| **Sharan** | User documentation, API reference, deployment guide | `docs/USER_GUIDE.md`, `docs/API_REFERENCE.md`, `docs/DEPLOYMENT.md` |

---

### Week 18: Final Review & Launch Prep (Nov 28 – Nov 30)
| **All Members** | Load testing, bug fixes, final demo preparation | `scripts/load-test.sh`, `docs/FINAL_DEMO.md` |

**Project Completion Date:** November 30, 2026

---

## Progress Tracking Legend
- ✅ = Completed
- 🔄 = In Progress
- 📋 = Planned
- ❌ = Blocked/Needs Review

## Quick Setup Commands
```bash
# Database Setup
cd sql && mysql -u root -p < schema/00_global_standards.sql

# Web App Setup
cd web-app && npm install && cp .env.local.example .env.local

# AI Services Setup
cd ai && pip install -r requirements.txt
```

---

*Last Updated: August 13, 2026*  
*Maintained by: Hitotsume-Nozo*
