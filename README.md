# W2E Product Promotional Page

A promotional landing page for **W2E (What to Eat)** — a food discovery and matching app for Gen Z.

## About W2E

W2E helps you and your squad discover amazing food spots and match on what to eat together. The app combines food discovery, social features, and gamification into one platform.

### Key Features

- **Discover** — Search restaurants and food places nearby via Google Maps
- **Squad Match** — Match food preferences with friends to find places everyone loves
- **Taste Profile** — Build personalized food preferences with categories, styles, and choices
- **Friends** — Connect with your crew and see what they're into
- **Rewards & Achievements** — Earn points for posts, reviews, and referrals
- **Food Journey** — Track culinary adventures on a map
- **Streaks** — Build daily activity streaks for bonus rewards
- **Live Location Sharing** — Real-time location sharing in match sessions with travel time estimates

### Platform Support

| Platform | Stack |
|----------|-------|
| Backend | FastAPI, SQLAlchemy, Redis, JWT + Google OAuth |
| Mobile | React Native, Expo, Zustand, TypeScript |
| Web | React 18, Vite, Tailwind CSS, Zustand, TypeScript |

### Integrations

Google Maps API, Google OAuth, OpenAI (AI recommendations), Sentry (error tracking), MinIO/S3 (image storage)

## About This Project

This repository contains the **product promotional page** for W2E — a public-facing landing page designed to showcase the app's features, attract new users, and drive downloads/sign-ups.

### Hosting

Deployed via **Firebase Hosting**.

## Getting Started

### Prerequisites

- Node.js 18+
- Firebase CLI (`npm install -g firebase-tools`)

### Setup

```bash
# Clone the repository
git clone <repo-url>
cd W2E-Product-page

# Install dependencies
npm install

# Login to Firebase
firebase login

# Start local development
npm run dev
```

### Deployment

```bash
# Deploy to Firebase Hosting
firebase deploy
```

## Project Structure

```
W2E-Product-page/
├── README.md               # This file
├── product-readme.md       # Full W2E product documentation
└── firebase-debug.log      # Firebase debug logs
```

## License

This project is part of the W2E platform.
