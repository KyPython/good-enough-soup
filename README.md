# Good Enough Soup

A minimal viable product (MVP) demonstrating the "build a minimal viable product, then iterate" approach.

## MVP v1 Scope

**What it does:**
- Simple daily habit tracker / check-in app
- Users record 1-3 "wins" per day
- View recent days in a simple list

**Tech Stack:**
- **Backend**: Node.js + Express + TypeScript
- **Frontend**: React + TypeScript
- **Storage**: In-memory (no database)
- **Auth**: None (single user)

**MVP v1 Features:**
1. ✅ Add a daily entry with:
   - Date (defaults to today)
   - Short text (win/notes)
2. ✅ List last 7 entries

**API Endpoints:**
- `GET /entries` - Returns last 7 entries
- `POST /entries` - Creates a new entry

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm

### Installation & Running

1. **Start the backend:**
```bash
cd backend
npm install
npm run dev
```

The backend will run on `http://localhost:3001`

2. **Start the frontend (in a new terminal):**
```bash
cd frontend
npm install
npm start
```

The frontend will run on `http://localhost:3000` and open automatically in your browser.

## Project Structure

```
good-enough-soup/
├── backend/
│   ├── src/
│   │   └── index.ts          # Express API server
│   ├── package.json
│   └── tsconfig.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── EntryForm.tsx # Form to add entries
│   │   │   └── EntryList.tsx # List of recent entries
│   │   ├── App.tsx
│   │   └── index.tsx
│   ├── package.json
│   └── tsconfig.json
└── README.md
```

## Post-MVP Iteration Ideas

These are documented for future iterations - **not implemented in MVP v1**:

### Data Persistence
- [ ] File-based storage (JSON file)
- [ ] SQLite database
- [ ] PostgreSQL/MongoDB for production

### Authentication & Multi-User
- [ ] User registration/login
- [ ] JWT-based auth
- [ ] Multiple users with separate entries

### Enhanced Features
- [ ] Tags/categories for entries
- [ ] Edit/delete entries
- [ ] Search entries
- [ ] Filter by date range
- [ ] Export entries (CSV, JSON)

### Visualizations
- [ ] Simple charts (entries per day/week)
- [ ] Streak counter
- [ ] Calendar view
- [ ] Statistics dashboard

### UX Improvements
- [ ] Mobile-responsive design improvements
- [ ] Dark mode
- [ ] Keyboard shortcuts
- [ ] Offline support (PWA)
- [ ] Animations/transitions

### Technical Improvements
- [ ] Unit tests
- [ ] E2E tests
- [ ] CI/CD pipeline
- [ ] Docker containerization
- [ ] Environment variables for config
- [ ] Error logging/monitoring
- [ ] Rate limiting
- [ ] Input validation enhancements

### Social Features
- [ ] Share entries (public/private)
- [ ] Comments/reactions
- [ ] Follow other users

---

**Philosophy**: This MVP is deliberately simple and small. It's about "good enough now, not perfect." Each iteration can add value incrementally.

