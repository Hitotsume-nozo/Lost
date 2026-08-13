# Centralized Campus Lost & Found System

A comprehensive database-driven lost and found management system for Thapar Institute of Engineering & Technology.

## 🎯 Project Overview

This project implements a **Database-as-Application** architecture where business logic is encapsulated within the RDBMS using stored procedures and triggers, ensuring data integrity regardless of the frontend implementation.

## 👥 Authors

- **Sahil Soumen** (1024030444)
- **Arnav Jain** (1024030449)  
- **Sharan Sharma** (1024030511)

**Lab Instructor:** Ms. Banisha Sharma  
**Course:** UCS310 Database Management Systems  
**Academic Year:** 2026–2027

## 🏗️ Architecture

### Stage 1: Database Foundation ✅
- MySQL 8.0+ with VECTOR type support (AI-ready)
- 7 normalized tables (3NF/BCNF)
- 7 stored procedures for atomic operations
- 7 triggers for zero-touch automation
- 7 views for data abstraction
- Comprehensive indexing strategy

### Stage 2: Dynamic Web UI 🚧 (In Progress)
- Next.js 14 with App Router
- TypeScript for type safety
- Tailwind CSS with custom theme
- React Query for state management
- NextAuth.js for authentication
- Drizzle ORM for database operations

### Stage 3: AI Integration (Planned)
- Vector embeddings for similarity search
- Fraud detection scoring
- Smart recommendations
- Automated categorization

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- MySQL 8.0+
- npm or yarn

### Database Setup

```bash
cd sql
mysql -u root -p < schema/01_core_schema.sql
mysql -u root -p < views/01_views.sql
mysql -u root -p < indexes/01_indexes.sql
mysql -u root -p < procedures/01_procedures.sql
mysql -u root -p < triggers/01_triggers.sql
mysql -u root -p < seed/01_seed_data.sql
```

Or use the automated deploy script:
```bash
./scripts/deploy.sh
```

### Frontend Setup

```bash
cd frontend
cp .env.example .env.local
# Edit .env.local with your database credentials
npm install
npm run dev
```

Visit `http://localhost:3000`

## 📁 Project Structure

```
lost-and-found-system/
├── docs/                      # Documentation
│   ├── STAGE_1_SUMMARY.md
│   └── VERIFICATION_QUERIES.md
├── scripts/                   # Deployment scripts
│   └── deploy.sh
├── sql/                       # Database components
│   ├── schema/                # Table definitions
│   ├── views/                 # Data abstraction views
│   ├── indexes/               # Performance indexes
│   ├── procedures/            # Business logic
│   ├── triggers/              # Automation
│   └── seed/                  # Test data
└── frontend/                  # Next.js application
    ├── src/
    │   ├── app/               # Pages and routes
    │   ├── components/        # Reusable UI components
    │   ├── lib/               # Database and utilities
    │   ├── hooks/             # Custom React hooks
    │   └── types/             # TypeScript types
    └── public/                # Static assets
```

## 🔑 Key Features

### Database Layer
- **Atomic Operations**: All critical actions wrapped in transactions
- **Business Rule Enforcement**: Constraints at database level
- **Automated Lifecycle**: Triggers handle status transitions
- **Audit Trail**: Complete history of all actions
- **PII Protection**: Views mask sensitive data

### Web Application
- **Public Search**: Browse items without authentication
- **Role-Based Access**: Separate user/admin dashboards
- **Real-Time Claims**: Submit and track claim status
- **Advanced Filtering**: Search by category, status, keywords
- **Responsive Design**: Mobile-friendly interface

## 🛡️ Security Features

- Parameterized queries (SQL injection prevention)
- Role-based access control
- Session management with JWT
- Input validation at multiple layers
- Foreign key constraints

## 📊 Testing

Demo credentials:
- **Admin**: admin@thapar.edu / password
- **User**: student@thapar.edu / password

## 📄 License

This project is created for academic purposes at Thapar Institute of Engineering & Technology.

## 🙏 Acknowledgments

Department of Computer Science & Engineering  
Thapar Institute of Engineering & Technology
