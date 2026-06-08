# ദൈനംദിന ദിക്ർ — Daily Dhikr & Dua Tracker

A modern Islamic daily dua checklist app built with React + TailwindCSS + Firebase.

## ✨ Features

- 8 daily duas from wake-up to sleep (Malayalam + Arabic)
- Firebase Authentication (Email/Password + Google)
- Progress bar & streak counter
- Dark mode toggle
- Arabic / Malayalam / Both view toggle
- Transliteration toggle
- Mark All Complete button
- Motivational Quranic quotes
- Browser notification reminders
- Auto-reset every new day
- Mobile-first responsive design

---

## 🚀 Local Development

```bash
cd dhikr-todo
npm install
npm run dev
```

Open http://localhost:5173

---

## 🔥 Firebase Setup

1. Go to [console.firebase.google.com](https://console.firebase.google.com)
2. Create a project → Add Web App → copy the config
3. Go to **Authentication** → **Sign-in method** → Enable:
   - ✅ Email/Password
   - ✅ Google
4. Copy `.env.example` to `.env` and fill in your values:

```bash
cp .env.example .env
```

Then edit `.env` with your Firebase config values.

---

## ▲ Deploy to Vercel

### Option 1: Vercel CLI

```bash
npm install -g vercel
vercel
```

### Option 2: Vercel Dashboard (recommended)

1. Push your code to GitHub (make sure `.env` is in `.gitignore` ✅)
2. Go to [vercel.com](https://vercel.com) → New Project → Import your repo
3. Set **Framework Preset** to `Vite`
4. Add **Environment Variables** in Vercel dashboard:

| Variable | Value |
|---|---|
| `VITE_FIREBASE_API_KEY` | your api key |
| `VITE_FIREBASE_AUTH_DOMAIN` | your-project.firebaseapp.com |
| `VITE_FIREBASE_PROJECT_ID` | your-project-id |
| `VITE_FIREBASE_STORAGE_BUCKET` | your-project.firebasestorage.app |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | your sender id |
| `VITE_FIREBASE_APP_ID` | your app id |
| `VITE_FIREBASE_MEASUREMENT_ID` | your measurement id |

5. Click **Deploy** ✅

### ⚠️ After deploying — add Vercel domain to Firebase

After Vercel gives you a URL (e.g. `dhikr-todo.vercel.app`), add it to Firebase:

1. Firebase Console → **Authentication** → **Settings** → **Authorized domains**
2. Click **Add domain** → paste your Vercel URL (without `https://`)
3. Save ✅

---

## 📁 Project Structure

```
dhikr-todo/
├── src/
│   ├── components/
│   │   ├── auth/          # Login, Register, AuthPage
│   │   ├── checklist/     # TaskCard, ProgressCard, QuoteCard, NotificationBanner
│   │   └── layout/        # Header
│   ├── contexts/
│   │   ├── AuthContext.jsx    # Firebase auth state
│   │   └── DhikrContext.jsx   # Checklist state + localStorage
│   ├── data/
│   │   └── duas.js            # All 8 duas data
│   ├── pages/
│   │   └── Dashboard.jsx      # Main checklist page
│   ├── App.jsx
│   ├── main.jsx
│   ├── firebase.js            # Firebase config (uses .env)
│   └── index.css              # TailwindCSS + custom styles
├── .env                       # Your Firebase secrets (not committed)
├── .env.example               # Template for env vars
├── .gitignore
├── vercel.json                # SPA routing for Vercel
├── tailwind.config.js
├── vite.config.js
└── package.json
```
