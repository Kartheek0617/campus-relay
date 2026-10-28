# 🚀 CAMPUS RELAY — NxtWave Growth Lab Rebuild
> **Subtitle:** A Student-Powered AI Workshop Acquisition Engine  
> **Mission:** Acquire **500 verified final-year engineering student registrations** for a free workshop *"Build Your First AI Project in 60 Minutes"* — within **7 days**, on a **₹2,000 budget** — using an organic, peer-driven growth loop.

[![Build Status](https://img.shields.io/badge/Vite%20Build-PASS%20100%25-brightgreen)](#)
[![Automated Tests](https://img.shields.io/badge/Python%20Tests-10%2F10%20PASS-brightgreen)](./test_relay_suite.py)
[![Budget](https://img.shields.io/badge/Campaign%20Budget-₹2%2C000%20Max-blue)](#)
[![Target](https://img.shields.io/badge/Target%20Registrations-500%20Verified-indigo)](#)

---

## 📌 Executive Summary

Acquiring 500 engineering students on a ₹2,000 budget within 7 days is impossible through traditional paid advertising (typical EdTech B2C CPA in India ranges between ₹60–₹180 per registration).

Instead of burning capital on ads, **CAMPUS RELAY** transforms students and college technical chapters into acquisition nodes. By providing a clear value-exchange—an honest, hands-on 60-minute build sprint without false job promises—we activate 20 college clubs and 20 campus ambassadors to drive 500 registrations with single first-touch attribution and real-time telemetry.

---

## 🏗️ System Architecture & Technology Stack

| Layer | Technology | Purpose |
|---|---|---|
| **Frontend Framework** | React 18 + Vite 5 | High-performance SPA with sub-second hot reload and instant compilation. |
| **Icons & Design Tokens** | Lucide React + Modern CSS | Accessible dark theme with glassmorphism, responsive data tables, and high contrast. |
| **Attribution Engine** | Reactive In-Memory & LocalStorage | Deterministic referral tracking, anti-self-referral checks, and email deduplication. |
| **Sharing Toolkit** | `wa.me` URL Encoding + Clipboard API | Instant WhatsApp invitation generation with 3 student-centric copy variants. |
| **Verification Suite** | Python 3.12 Test Engine | 10-stage automated audit verifying mathematical reconciliation and edge cases. |

---

## 📂 Project Organization

```text
nxtwave-campus-relay/
├── dist/                          # Production-ready build artifacts
├── src/
│   ├── components/
│   │   ├── Navbar.jsx             # Navigation bar with simulation status & quick demo triggers
│   │   ├── WorkshopLanding.jsx    # Feature 1: Student-facing 60-minute workshop page
│   │   ├── RegistrationModal.jsx  # Feature 2: Validated registration & code generation
│   │   ├── AmbassadorToolkit.jsx  # Feature 3: 3-role ambassador hub & WhatsApp sharing suite
│   │   ├── LeaderboardView.jsx    # Feature 4: Real-time referral attribution & college ranks
│   │   ├── OperationsDashboard.jsx# Feature 5: Campaign ops telemetry & ₹2,000 budget tracking
│   │   ├── GrowthSimulator.jsx    # Feature 6: Interactive growth scenario planning tool
│   │   └── ReviewerDemoModal.jsx  # Feature 7: 8-step evaluator walkthrough modal
│   ├── services/
│   │   └── store.js               # Reactive store, deduplication logic & campaign metrics
│   ├── App.jsx                    # Root application container & URL param parser
│   ├── index.css                  # Design system tokens, glassmorphism & responsive utilities
│   └── main.jsx                   # React application mount
├── submission/                    # Official submission documentation package
│   ├── GROWTH_PLAN.md             # 2-page executive growth strategy & forecast
│   ├── AI_LEARNING_NOTES.md       # 3 AI reasoning examples & explicit rejection response
│   ├── VIDEO_SCRIPT.md            # 3-minute demo video script with timestamps
│   ├── TEST_REPORT.md             # Comprehensive test results & bug audit
│   └── README.md                  # Symlink / mirror of project overview
├── test_relay_suite.py            # Automated 10-stage Python verification suite
├── package.json                   # Project dependencies & npm scripts
├── vite.config.js                 # Vite configuration (port 5174)
└── index.html                     # HTML5 entrypoint with Google Fonts
```

---

## ⚡ Quick Start & Run Instructions

### Prerequisites
- Node.js v18+ (tested on v24.18.0)
- Python 3.10+ (tested on v3.12.10)

### 1. Install Dependencies
```bash
cd nxtwave-campus-relay
npm install
```

### 2. Start Local Development Server
```bash
npm run dev
```
Open **`http://localhost:5174/`** in your browser.

### 3. Run Automated Tests
```bash
python test_relay_suite.py
```

### 4. Build for Production
```bash
npm run build
```

---

## 🔐 Student & Admin Authentication System

The platform includes a complete role-based authentication suite with persistent local sessions:

### Pre-Configured Test Credentials:

| Role | Email Address | Password | Permissions & View |
|---|---|---|---|
| **Admin** | `admin@nxtwave.tech` | `Admin@1234` | Full Campaign Ops, Student Management Directory, Lead CSV Export, Record Deletion |
| **Student** | `aarav.sharma@srm.edu` | `Student@1234` | Personal Workshop Pass, Unique Referral Code (`RELAY-AARAV1`), Live Milestone Tracker |
| **New Student** | *(Self-registration)* | *(User-chosen min 6 chars)* | Instant free workshop seat pass, unique auto-generated referral code & student hub |

### Key Features:
- **Login Modal**: Tabbed login for Students and Admins with password visibility toggle and 1-click demo autofill.
- **Create Student Account**: Form capturing Name, College Email, Password, College, Branch, Graduation Year, and optional Referral Code.
- **Student Portal**: Shows confirmed workshop seat ticket, personal referral code/link, WhatsApp sharing CTA, milestone progression (1, 10, 25 referrals), and peer registration history.
- **Admin Directory**: Real-time student directory in Campaign Ops with branch filtering, search, and one-click CSV export.
- **Persistent State**: User accounts and login sessions persist across page refreshes via `localStorage`.
- **Reviewer Walkthrough Shortcuts**: Instant 1-click Admin and Student login buttons directly inside the Reviewer Demo Modal.

---

## 🎯 Evaluator Demo Walkthrough (Under 2 Minutes)

You can test the entire product without touching code:

1. **Open the App:** Navigate to `http://localhost:5174/`.
2. **Review Workshop Page:** Scroll to the 4-phase curriculum cards (Architecture → Live Code → Deployment → Interview Prep).
3. **Open Reviewer Demo:** Click the **"Reviewer Demo"** cyan button in the top navigation bar.
4. **Step 2 — Register Student 1:** Click **"⚡ Quick-Register Student 1"**. An instant registration for *Aditi Sengupta* is created, generating a unique referral code (e.g. `RELAY-ADIT999`).
5. **Step 4 — Test Attribution:** Click **"⚡ Quick-Register with Referral Code"**. A second student (*Rahul Mehra*) registers using *Aarav Sharma's* code.
6. **Step 5 — Check Leaderboard:** Switch to the **Leaderboard** tab. Verify Aarav Sharma's referral count has dynamically incremented and college rankings updated.
7. **Step 6 — Ops Dashboard:** Check the **Campaign Ops** tab to view the 500-seat milestone progress, daily pace required, and ₹2,000 budget allocation.
8. **Step 7 — Growth Simulator:** Switch to **Growth Simulator**. Move sliders to test conservative vs aggressive scenarios.
9. **Step 8 — Reset Demo:** Click **"Reset Demo State"** to restore clean initial seeds.

---

## 📊 Growth Strategy & Forecast Mathematics

### Mathematical Formula:
$$\text{Projected Registrations} = (20 \text{ Clubs} \times 12) + (20 \text{ Ambassadors} \times 8) + 100 \text{ Direct} = 240 + 160 + 100 = 500$$

- **College Clubs (48%):** 20 clubs × 12 registrations = **240**.
- **Campus Ambassadors (32%):** 20 active ambassadors × 8 referrals = **160**.
- **Direct Student Communities (20%):** Moderated Discord & placement groups = **100**.
- **Total Forecast:** **500 unique registrations**.

### ₹2,000 Budget Allocation:
- **₹800 (40%):** Controlled Paid Experiment (creative copy testing on Instagram/LinkedIn).
- **₹500 (25%):** Campus Activation Collateral (digital badges, QR flyers for noticeboards).
- **₹400 (20%):** Outreach Collateral (*AI Starter Blueprint* milestone materials).
- **₹300 (15%):** Contingency Reserve.
- **Blended Budget Ratio:** $\frac{₹2,000}{500} = \mathbf{₹4.00 \text{ per target registrant}}$.

---

## 🛡️ Attribution Safeguards & Anti-Abuse Rules

1. **Email Deduplication:** Case-insensitive email normalization prevents duplicate seat hoarding.
2. **Anti-Self-Referral:** The engine detects and blocks users attempting to register using their own referral code.
3. **Single First-Touch Attribution:** If a student encounters multiple links, the first valid code locks attribution.
4. **Graceful Error Handling:** Typing an invalid or expired referral code allows registration to complete without system crash.
5. **Simulation Isolation:** All data is clearly flagged with `SIMULATION DATA / VERIFIED DEMO ENGINE`.

---

## ☁️ Deployment Instructions

The project compiles to pure static HTML/JS/CSS in the `/dist` directory.

### Deploy to Vercel:
```bash
npm install -g vercel
vercel deploy --prod
```

### Deploy to Cloudflare Pages / Netlify:
- Build command: `npm run build`
- Output directory: `dist`

---

## 📄 Submission Artifacts

All formal challenge submission artifacts are packaged in the `/submission` folder:
- **[GROWTH_PLAN.md](./submission/GROWTH_PLAN.md):** 2-page executive growth plan and budget allocation.
- **[AI_LEARNING_NOTES.md](./submission/AI_LEARNING_NOTES.md):** 3 strategic AI reasoning examples and the explicit rejection answer.
- **[VIDEO_SCRIPT.md](./submission/VIDEO_SCRIPT.md):** 3-minute demonstration script with timestamps.
- **[TEST_REPORT.md](./submission/TEST_REPORT.md):** Automated and manual verification audit logs.
