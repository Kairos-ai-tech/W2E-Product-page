# W2E - What to Eat 🍕

Your foodie bestie - a food discovery and matching app for Gen Z.

## What is W2E?

W2E (What to Eat) helps you and your squad discover amazing food spots and match on what to eat together. The platform includes:

- 🔍 **Discover** - Search for restaurants and food places near you using Google Maps
- 🤝 **Squad Match** - Match food preferences with your friends to find places everyone will love
- 🍜 **Taste Profile** - Build your food preferences with categories, styles, and choices
- 👯 **Friends** - Connect with your crew and see what they're into
- 📍 **Search History** - Track your food discoveries
- 🏆 **Rewards & Achievements** - Earn points for posts, reviews, and referrals
- 🗺️ **Food Journey** - Track your culinary adventures on a map
- 🔥 **Streaks** - Build daily activity streaks for bonus rewards

## Project Structure

```
w2e/
├── src/                      # Backend (FastAPI)
│   ├── api/routes/           # API endpoints
│   ├── auth/                 # JWT & OAuth authentication
│   ├── events/               # Event-driven architecture (pub/sub)
│   ├── models/               # SQLAlchemy ORM models
│   ├── repositories/         # Repository pattern (database abstraction)
│   ├── schemas/              # Pydantic validation
│   ├── services/             # Business logic
│   ├── middleware/           # Rate limiting & security
│   ├── i18n/                 # Internationalization (5 languages)
│   └── utils/                # Google Maps, OpenAI integrations
├── mobile/                   # Mobile App (React Native + Expo)
│   └── src/
│       ├── screens/          # App screens
│       ├── components/       # UI components
│       ├── store/            # Zustand state management
│       └── services/         # API clients
├── web/                      # Web App (React + Vite + Tailwind)
│   └── src/
│       ├── pages/            # Page components
│       ├── components/       # UI components
│       ├── stores/           # Zustand state management
│       └── lib/              # API client & utilities
├── tests/                    # Backend tests
└── scripts/                  # Database utilities
```

## Tech Stack

### Backend
- **FastAPI** - Python web framework
- **SQLAlchemy** - Async ORM (SQLite dev / PostgreSQL prod)
- **Pydantic** - Data validation
- **JWT + OAuth2** - Authentication (Google sign-in)
- **Redis** - Caching layer

### Mobile
- **React Native** - Cross-platform mobile
- **Expo** - Development toolchain
- **Zustand** - State management
- **TypeScript** - Type safety

### Web
- **React 18** - UI framework
- **Vite** - Fast build tool
- **Tailwind CSS** - Utility-first styling
- **Zustand** - State management
- **TypeScript** - Type safety

### Integrations
- **Google Maps API** - Place search
- **Google OAuth** - Authentication
- **OpenAI** - AI recommendations
- **Sentry** - Error tracking
- **MinIO/S3** - Image storage

## Architecture

The backend follows a clean layered architecture with separation of concerns:

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   API Routes    │───▶│    Services     │───▶│  Repositories   │
└─────────────────┘    └─────────────────┘    └─────────────────┘
        │                      │                       │
        ▼                      ▼                       ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Validators    │    │   Event Bus     │    │   SQLAlchemy    │
│   (Pydantic)    │    │   (Pub/Sub)     │    │    (ORM)        │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

### Key Patterns

- **Repository Pattern** - Database operations abstracted behind repository classes (`src/repositories/`)
- **Event-Driven Architecture** - Domain events for decoupled notifications (`src/events/`)
- **Custom Exceptions** - Service layer uses domain exceptions, not HTTP exceptions
- **Caching Layer** - Redis caching for frequently accessed data

## Getting Started

### Prerequisites

- Python 3.10+
- Poetry
- Node.js 18+
- Expo CLI (`npm install -g expo-cli`)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/sean85120/Qubic.git
   cd Qubic
   ```

2. **Install backend dependencies:**
   ```bash
   poetry install
   ```

3. **Install mobile dependencies:**
   ```bash
   cd mobile && npm install && cd ..
   ```

4. **Install web dependencies:**
   ```bash
   cd web && npm install && cd ..
   ```

5. **Set up environment variables:**
   ```bash
   cp .env.example .env.dev
   # Edit .env.dev with your API keys
   ```

   Required variables:
   ```
   GOOGLE_API_KEY=<your-google-maps-api-key>
   GOOGLE_OAUTH_CLIENT_ID=<your-google-client-id>
   GOOGLE_OAUTH_CLIENT_SECRET=<your-google-client-secret>
   DATABASE_URL=sqlite+aiosqlite:///./matching_choices.db
   PROJECT_SECRET=<your-secret-key>
   ```

### Running the App

```bash
# Backend only
make start

# Web app only
cd web && npm run dev

# Backend + Web app
make start-with-web

# Backend + Mobile app
make start-with-mobile

# All services together
make start-all
```

### Mobile API Configuration

Update `mobile/src/constants/config.ts`:
- iOS Simulator: `http://localhost:8000`
- Android Emulator: `http://10.0.2.2:8000`
- Physical Device: Use your computer's IP address

## Development Commands

| Command | Description |
|---------|-------------|
| `make start` | Start backend server (port 8000) |
| `make start-with-web` | Start backend + web app |
| `make start-with-mobile` | Start backend + mobile |
| `make start-all` | Start all services |
| `make tests` | Run tests with coverage |
| `make schemas` | Generate Pydantic models |
| `cd web && npm run dev` | Start web app (port 5173) |
| `cd web && npm test` | Run web app tests |
| `cd mobile && npm test` | Run mobile app tests |

## API Endpoints

- `/auth/*` - Authentication (login, register, OAuth)
- `/users/*` - User management
- `/places/*` - Place search (Google Maps)
- `/categories/*` - Food categories
- `/choices/*` - User food choices
- `/friends/*` - Friend management
- `/votes/*` - Voting on choices
- `/rewards/*` - Points, stats, leaderboard, food journey
- `/achievements/*` - Achievement tracking and categories
- `/referrals/*` - Referral code management
- `/health` - Health check

## Roadmap

### Completed Features

#### Phase 1-8: Core Platform
- [x] User authentication (JWT + Google OAuth)
- [x] Food preferences system (categories, styles, choices)
- [x] Google Maps place search integration
- [x] Friend management system
- [x] Reviews and posts with tier-based access
- [x] Rewards, achievements, and gamification
- [x] Food journey tracking
- [x] Multi-language support (5 languages)

#### Phase 9: Live Location Sharing
- [x] Real-time location sharing in match sessions
- [x] Travel time estimation to venues
- [x] Privacy controls for location visibility

#### Phase 15: MVP Polish
- [x] Onboarding flow for new users
- [x] Place status indicators (open/closed)
- [x] Enhanced travel time display

#### Mobile App Hardening (Feb 2026)
- [x] Secure token storage (expo-secure-store)
- [x] Automatic token refresh with request queuing
- [x] Rate limiting with exponential backoff
- [x] Input validation and XSS sanitization
- [x] Deep link validation with Unicode normalization
- [x] Offline support with Zustand persist middleware
- [x] Network status detection
- [x] Error boundary for crash recovery
- [x] Accessibility support (VoiceOver/TalkBack)
- [x] EAS Build configuration

### Upcoming Features

#### Phase 16: Social Features
- [ ] Group chat in match sessions
- [ ] Share places to social media
- [ ] Activity feed for friends

#### Phase 17: AI Recommendations
- [ ] Personalized place recommendations based on taste profile
- [ ] Smart suggestions based on time of day and weather
- [ ] AI-powered menu analysis

#### Phase 18: Enhanced Matching
- [ ] Real-time collaborative voting
- [ ] Preference learning from past choices
- [ ] Calendar integration for meal planning

#### Phase 19: Business Features
- [ ] Restaurant partner portal
- [ ] Promoted listings
- [ ] Analytics dashboard for venues

### Technical Improvements
- [ ] Push notifications
- [ ] WebSocket for real-time updates
- [ ] Offline-first architecture
- [ ] Performance monitoring (Sentry)
- [ ] A/B testing framework

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is part of the W2E platform.
