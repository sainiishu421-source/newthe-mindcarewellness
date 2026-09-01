# Mind Care Wellness Platform - Full-Stack React (Vite) + Python API

An enterprise-grade mental health & sanctuary web platform built with **React**, **Vite**, **Tailwind CSS**, and a **Python REST API** backed by **SQLite**.

---

## Architecture Overview

- **Frontend**: React 18, Vite 5, Tailwind CSS, Google Material Symbols & Manrope Typography.
- **Backend**: Python REST API (`backend/main.py`) powered by **FastAPI** / **Uvicorn** (with universal fallback to Python standard library `http.server`).
- **Database**: Embedded SQLite database (`backend/mind_care.db`) managed by `backend/database.py`.

---

## Directory Structure

```
stitch_mind_care_wellness_platform/
├── backend/
│   ├── database.py       # SQLite database initialization & CRUD models
│   ├── main.py           # Python REST API server (FastAPI + fallback)
│   ├── run_backend.py    # Python backend entry point launcher
│   ├── requirements.txt  # Python backend dependencies
│   └── mind_care.db      # SQLite database file (auto-generated)
├── src/
│   ├── components/       # Modular React UI components
│   │   ├── Sidebar.jsx
│   │   ├── Header.jsx
│   │   ├── DashboardView.jsx
│   │   ├── AssessmentsView.jsx
│   │   ├── TrackRecordView.jsx
│   │   ├── ConsultationsView.jsx
│   │   ├── HelpSupportView.jsx
│   │   └── PrivacySecurityView.jsx
│   ├── services/
│   │   └── api.js        # API service layer connecting React to Python
│   ├── App.jsx           # Main application shell
│   ├── main.jsx          # Entry point
│   └── index.css         # Styling & utility classes
├── index.html            # HTML shell with Google Fonts
├── vite.config.js        # Vite config with API proxy to Python backend (port 8000)
└── package.json          # Node dependencies & dev scripts
```

---

## How to Run the Application

### 1. Run the Python Backend

In your terminal, navigate to the project directory and execute:

```bash
python backend/run_backend.py
```
> The Python server starts on `http://localhost:8000`.

### 2. Run the React (Vite) Frontend

In another terminal window, run:

```bash
npm run dev
```
> Open your browser at `http://localhost:5173`.

---

## Key Features

1. **Interactive Clinical Screener (GAD-7)**: Real-time score calculation, clinical severity assessment, and automatic saving to the Python database.
2. **Therapist Consultations**: Licensed psychologist profiles, date & time slot selection, promo code validation (`MINDCARE10`), card payment checkout, and encrypted video call simulation.
3. **Daily Mood Check-in & Streaks**: Mood tracking linked to backend API logs.
4. **Wellness Track Record**: Historical timeline of completed screeners and appointments.
5. **Help & Support**: Searchable FAQ accordions and 24/7 care team contact.
6. **Privacy & Security**: HIPAA-compliant protocol specs, AES-256 encryption overview, and export archive tool.
