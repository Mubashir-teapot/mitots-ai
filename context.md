# Mitots AI Solutions — Project Context

## What This App Is
React web app for **Ora-Tech Systems Pvt. Ltd.** that generates professional business documents using AI (Gemini or Claude). Staff log in, fill in a form, click Generate, AI returns a formatted document.

---

## Current Stack

| Layer | Tech |
|-------|------|
| Frontend | React 18 + Vite + Tailwind CSS (port 3000) |
| Backend | Express + TypeScript + Prisma (port 8080) |
| Database | PostgreSQL 16 (Docker) |
| DB Admin | pgAdmin 4 (Docker) |
| AI | Google Gemini 2.5 Flash (active) / Claude Sonnet (ready) |
| ORM | Prisma |

---

## How to Run

### 1. Start Database (Docker)
```bash
# Run from the ROOT of the project (docker-compose.yml is at root)
docker compose up -d
# Postgres → localhost:5432
# pgAdmin → http://localhost:5050  (admin@ora-tech.com / admin123)
```

### 2. Start Backend (first time only — create DB tables)
```bash
cd backend
npm install
npm run db:push
npm run dev
# Server → http://localhost:8080
```

### 3. Start React Frontend
```bash
cd frontend
npm install
npm run dev
# App → http://localhost:3000
```

### Default Login
- **Username:** `admin`
- **Password:** `mitots2024`
> Change these in `backend/.env` — `ADMIN_USERNAME` and `ADMIN_PASSWORD`

> **Port note:** Port 6000 is reserved by X11 on Linux. Backend uses **8080**.

---

## Project Structure

```
Mitots-AI/
├── context.md                  ← this file
├── docker-compose.yml          Postgres (5432) + pgAdmin (5050) — run from root
├── backend/                    ← Express + TypeScript server
│   ├── .env                    API keys + port — GITIGNORED
│   ├── .env.example            Template (safe to commit)
│   ├── package.json
│   ├── tsconfig.json
│   ├── prisma/
│   │   └── schema.prisma       2 models: GeneratedDocument, CustomModule
│   └── src/
│       ├── index.ts            Express entry — registers all routes
│       ├── config/env.ts       Typed env vars
│       ├── db/prisma.ts        Prisma client singleton
│       ├── constants/company_context.ts   AI system prompt (Ora-Tech context)
│       ├── services/ai.service.ts         Gemini / Claude switch
│       ├── middleware/errorHandler.ts
│       └── routes/
│           ├── auth.route.ts        POST /api/auth/login
│           ├── generate.route.ts    POST /api/generate
│           ├── documents.route.ts   GET|DELETE /api/documents
│           └── modules.route.ts     CRUD /api/modules
└── frontend/                   ← React + Vite + Tailwind app
    ├── package.json
    ├── vite.config.js
    ├── tailwind.config.js
    ├── index.html
    ├── .env                    VITE_API_URL=http://localhost:8080
    └── src/
        ├── main.jsx            App entry
        ├── App.jsx             Router (login guard, routes)
        ├── index.css           Tailwind + custom components
        ├── services/
        │   └── api.js          All fetch calls to backend
        ├── pages/
        │   ├── LoginPage.jsx       Full-screen login with token auth
        │   ├── MainLayout.jsx      Main app shell with sidebar + panels
        │   └── SettingsPage.jsx    Backend status, model info, logout
        └── components/
            ├── Sidebar.jsx         Left nav (modules + Add Module dialog)
            ├── OutputPanel.jsx     Generated output + copy/clear buttons
            ├── ui/
            │   ├── InputField.jsx  Reusable text/textarea input
            │   └── SelectField.jsx Reusable select dropdown
            └── modules/
                ├── GenerateButton.jsx   Shared gold generate button
                ├── ProposalModule.jsx   Fields: clientName, industry, services, users, duration, notes
                ├── EmailModule.jsx      Fields: emailType, tone, recipientEmail, recipient, company, subject, points
                ├── InvoiceModule.jsx    Fields: docType, clientName, company, items, notes
                ├── ResourceModule.jsx   Fields: clientName, role, count, duration, skills, notes
                ├── HRModule.jsx         Fields: docType, department, details
                ├── ProjectDocModule.jsx Fields: docType, projectName, clientName, objective, scope, team, timeline, techStack, notes
                └── CustomModule.jsx     Generic: recipient, details, extra + delete button
```

---

## Brand Colors

| Name | Hex | Usage |
|------|-----|-------|
| Gold | `#E8A020` | Primary actions, active items |
| Deep Navy | `#0B1929` | Sidebar, header, navy elements |
| Background | `#F0F4F9` | App background |
| Border | `#DDE3EC` | Card/input borders |
| Text Primary | `#1A2332` | Headings, body |
| Text Secondary | `#5A6B82` | Labels, hints |

---

## API Routes

| Method | Route | Purpose |
|--------|-------|---------|
| POST | `/api/auth/login` | `{username, password}` → `{token, username}` |
| GET | `/api/health` | Backend status + active model info |
| POST | `/api/generate` | `{module, prompt}` → calls AI, saves to DB, returns `{success, content, documentId}` |
| GET | `/api/documents` | List all generated documents |
| GET | `/api/documents/:id` | Single document |
| DELETE | `/api/documents/:id` | Delete document |
| GET | `/api/modules` | List custom modules |
| POST | `/api/modules` | Create custom module |
| DELETE | `/api/modules/:id` | Delete custom module |

---

## Database Schema (Prisma)

```prisma
model GeneratedDocument {
  id        String   @id @default(cuid())
  module    String
  prompt    String   @db.Text
  content   String   @db.Text
  model     String
  createdAt DateTime @default(now())
}

model CustomModule {
  id        String   @id @default(cuid())
  key       String   @unique
  icon      String
  title     String
  hint      String
  createdAt DateTime @default(now())
}
```

---

## Authentication

- `POST /api/auth/login` validates `ADMIN_USERNAME` / `ADMIN_PASSWORD` from `backend/.env`
- Returns an HMAC-SHA256 token stored in `localStorage` (`mitots_token`)
- Frontend guards routes: unauthenticated users are redirected to `/login`
- Existing API routes (generate, documents, modules) do NOT require the token — backward compatible

---

## Switching AI Model

Edit `backend/.env` — no code change, no frontend rebuild needed:
```env
ACTIVE_MODEL=gemini   # uses Gemini 2.5 Flash
ACTIVE_MODEL=claude   # uses Claude Sonnet 4.6
```
Restart backend after changing.

---

## backend/.env variables (see .env.example for template)
```
PORT=8080
NODE_ENV=development
ACTIVE_MODEL=gemini            # or claude
GEMINI_MODEL=gemini-2.5-flash
GEMINI_API_KEY=<your key>
CLAUDE_MODEL=claude-sonnet-4-6
CLAUDE_API_KEY=<your key>
MAX_TOKENS=2200
DATABASE_URL="postgresql://mitots:mitots123@localhost:5432/mitots_ai?schema=public"
ADMIN_USERNAME=admin
ADMIN_PASSWORD=mitots2024
TOKEN_SECRET=mitots-internal-secret
```

## CORS

Backend (`backend/src/index.ts`) explicitly allows:
- Origins: `localhost:3000`, `localhost:5173`, any `localhost:<port>`
- Headers: `Content-Type`, `Authorization`
- Methods: `GET`, `POST`, `PUT`, `DELETE`, `OPTIONS`
