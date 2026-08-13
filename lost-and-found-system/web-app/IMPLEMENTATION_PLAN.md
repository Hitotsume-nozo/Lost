# Stage 2: Dynamic Web UI Implementation Plan

## Architecture Overview

**Stack:** Next.js 14 (App Router) + TypeScript + Tailwind CSS + Shadcn/UI + Drizzle ORM + NextAuth.js

## Directory Structure

```
web-app/
├── src/
│   ├── app/
│   │   ├── (auth)/
│   │   │   ├── sign-in/
│   │   │   └── sign-up/
│   │   ├── (dashboard)/
│   │   │   ├── dashboard/
│   │   │   │   ├── admin/
│   │   │   │   └── user/
│   │   │   └── layout.tsx
│   │   ├── api/
│   │   │   ├── auth/[...nextauth]/
│   │   │   ├── items/
│   │   │   ├── claims/
│   │   │   └── reports/
│   │   ├── items/
│   │   │   ├── [id]/
│   │   │   └── page.tsx
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── ui/              # Shadcn components
│   │   ├── items/
│   │   ├── claims/
│   │   └── shared/
│   ├── lib/
│   │   ├── db.ts            # Drizzle connection
│   │   ├── schema.ts        # Drizzle schema (mirrors SQL)
│   │   ├── auth.ts          # NextAuth config
│   │   └── utils.ts
│   └── hooks/
├── .env.local.example
├── drizzle.config.ts
├── next.config.js
├── tailwind.config.ts
└── tsconfig.json
```

## Phase 2 Implementation Roadmap

### Phase 2A: Foundation (Current)
- ✅ Project scaffolding
- ⏳ Environment setup
- ⏳ Database connection layer (Drizzle ORM)
- ⏳ Authentication system (NextAuth.js with credentials provider)

### Phase 2B: Core Features
- Public item search (no auth required)
- User registration/login
- Report lost/found item form
- User dashboard (my items, my claims)
- Admin dashboard (all claims, approval interface)

### Phase 2C: Advanced Features
- Real-time notifications (polling for now, WebSocket-ready)
- Image upload handling (base64 for demo, S3-ready)
- Category filtering and advanced search
- Export functionality (CSV/PDF reports)

### Phase 2D: Polish & Security
- Rate limiting on API routes
- Input validation with Zod
- Error boundaries and fallback UIs
- Loading states and optimistic updates
- Mobile responsiveness

## AI Integration Headroom (Stage 3 Prep)

The following are already planned in the schema:
1. **Vector Search**: `embedding_vector` column ready for similarity search
2. **Smart Categorization**: ML model can auto-categorize from description
3. **Fraud Detection**: Pattern analysis on claim behavior
4. **Recommendation Engine**: "Similar items" based on embeddings
5. **Chatbot Interface**: RAG system over items database

## Database Connection Strategy

We'll use **Drizzle ORM** which provides:
- Type-safe queries
- Schema definition in TypeScript
- Migration generation
- Direct SQL escape hatches for stored procedures

```typescript
// lib/db.ts
import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import * as schema from './schema';

const connection = await mysql.createConnection({
  uri: process.env.DATABASE_URL!,
});

export const db = drizzle(connection, { schema, mode: 'default' });
```

## Authentication Flow

1. **Credentials Provider**: Email/password with bcrypt hashing
2. **JWT Strategy**: Stateless sessions for scalability
3. **Role-based Access**: `user` vs `admin` roles from database
4. **Protected Routes**: Middleware checks session and role

## API Design Principles

1. **RESTful Endpoints**: `/api/items`, `/api/claims`, etc.
2. **Stored Procedure Calls**: Use `CALL sp_*` for business logic
3. **Validation**: Zod schemas on all inputs
4. **Error Handling**: Standardized error responses
5. **Rate Limiting**: Prevent abuse on public endpoints

## Next Steps

Execute these commands locally to begin development:

```bash
cd web-app
npm install
npm install -D drizzle-kit @types/bcryptjs
npm install drizzle-orm mysql2 next-auth@4 bcryptjs zod @tanstack/react-query
npx shadcn-ui init
npx shadcn-ui add button input card dialog select toast dropdown-menu label
```

Then copy the SQL schema files from `/sql/schema/` to use with Drizzle.

---

**Author:** Hitotsume-Nozo  
**License:** MIT  
**Repository:** Private Personal Project
