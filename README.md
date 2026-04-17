# ⚛️ React TypeScript Boilerplate

A production-ready, batteries-included React boilerplate built with the latest versions of the best tools in the ecosystem.

---

## 🚀 Tech Stack

| Category | Technology |
|---|---|
| Framework | React 19 + Vite 6 |
| Language | TypeScript 5 (strict mode) |
| Styling | Tailwind CSS v4 + MUI v6 |
| State Management | Redux Toolkit v2 |
| Routing | React Router v7 |
| Data Fetching | Axios + TanStack React Query v5 |
| Auth | JWT (access + refresh token flow) |
| Containerization | Docker + Docker Compose |
| CI/CD | GitHub Actions |
| Code Quality | ESLint v9 + Prettier v3 |

---

## 📁 Project Structure

```
src/
├── assets/              # Static assets (images, fonts, icons)
├── components/
│   ├── common/          # Reusable shared components
│   │   ├── GlobalNotifications.tsx
│   │   ├── PageLoader.tsx
│   │   ├── ProtectedRoute.tsx
│   │   └── PublicRoute.tsx
│   ├── layout/          # Layout wrappers
│   │   ├── AuthLayout.tsx
│   │   ├── DashboardLayout.tsx
│   │   └── RootLayout.tsx
│   └── ui/              # Custom UI components
├── features/            # Feature-based modules (auth, etc.)
├── hooks/               # Custom React hooks
│   ├── useAppDispatch.ts
│   ├── useAuth.ts
│   └── useNotification.ts
├── lib/                 # Core library configs
│   ├── axios.ts         # Axios instance + interceptors
│   ├── queryClient.ts   # React Query config
│   └── theme.ts         # MUI light/dark themes
├── pages/               # Route-level page components
│   ├── auth/
│   │   ├── LoginPage.tsx
│   │   ├── RegisterPage.tsx
│   │   └── ForgotPasswordPage.tsx
│   ├── dashboard/
│   │   ├── DashboardPage.tsx
│   │   └── ProfilePage.tsx
│   └── NotFoundPage.tsx
├── router/              # React Router v7 config
│   └── index.tsx
├── services/            # API service layer
│   └── authService.ts
├── store/               # Redux store
│   ├── slices/
│   │   ├── authSlice.ts
│   │   └── uiSlice.ts
│   └── index.ts
├── styles/              # Global CSS
│   └── globals.css
├── types/               # TypeScript type definitions
│   └── index.ts
├── utils/               # Helper utilities
│   └── helpers.ts
└── main.tsx             # App entry point
```

---

## ⚡ Getting Started

### Prerequisites
- Node.js >= 20
- npm >= 9

### 1. Clone & Install

```bash
git clone https://github.com/your-username/react-ts-boilerplate.git
cd react-ts-boilerplate
npm install
```

### 2. Environment Setup

```bash
cp .env.example .env
# Edit .env with your values
```

### 3. Run Development Server

```bash
npm run dev
# App starts at http://localhost:3000
```

---

## 🐳 Docker

### Development (with HMR)

```bash
docker compose --profile dev up app-dev
```

### Production Build

```bash
docker compose up app
```

### Build image manually

```bash
docker build -t react-ts-boilerplate .
docker run -p 80:80 react-ts-boilerplate
```

---

## 🔐 Authentication Flow

The boilerplate includes a full JWT auth flow:

1. **Login/Register** → receives `accessToken` + `refreshToken`
2. Tokens stored in `localStorage` and Redux state
3. **Axios interceptor** automatically attaches `Authorization: Bearer <token>` header
4. On **401 response** → interceptor auto-refreshes token and retries request
5. On refresh failure → clears tokens and redirects to `/login`
6. **ProtectedRoute** guards private pages
7. **PublicRoute** redirects authenticated users away from auth pages

---

## 🎨 Theming

Light and dark themes are fully configured in `src/lib/theme.ts`.

Toggle theme from anywhere:

```tsx
import { useAppDispatch } from '@/hooks/useAppDispatch'
import { toggleTheme } from '@/store/slices/uiSlice'

const { dispatch } = useAppDispatch()
dispatch(toggleTheme())
```

**Note:** Tailwind's `preflight` is disabled to avoid conflicts with MUI. The `important: '#root'` setting ensures Tailwind utilities take precedence over MUI styles when needed.

---

## 📡 API Layer

All API calls go through `src/lib/axios.ts` (configured instance) and are organized in `src/services/`.

### Adding a new service

```ts
// src/services/userService.ts
import axiosInstance from '@/lib/axios'

export const userService = {
  getAll: async () => {
    const { data } = await axiosInstance.get('/users')
    return data
  },
}
```

### Using React Query with a service

```tsx
import { useQuery } from '@tanstack/react-query'
import { userService } from '@/services/userService'

const { data, isLoading } = useQuery({
  queryKey: ['users'],
  queryFn: userService.getAll,
})
```

---

## 🛠️ Available Scripts

| Script | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |
| `npm run lint:fix` | Auto-fix ESLint issues |
| `npm run format` | Format with Prettier |
| `npm run format:check` | Check Prettier formatting |
| `npm run type-check` | TypeScript type checking |

---

## 🔄 CI/CD Pipeline

GitHub Actions workflow (`.github/workflows/ci-cd.yml`) runs on every push/PR:

| Job | Trigger | Description |
|---|---|---|
| 🔍 Lint | All branches | ESLint + Prettier + Type check |
| 🏗️ Build | After lint | Vite production build |
| 🐳 Docker | `main` push | Build & push to GHCR |
| 🚀 Staging | `develop` push | Deploy to staging |
| 🌐 Production | `main` push | Deploy to production |

### Required GitHub Secrets

```
VITE_API_BASE_URL       # Your API base URL
VITE_APP_NAME           # Your app name
```

---

## 📦 Path Aliases

All aliases are configured in both `vite.config.ts` and `tsconfig.json`:

```ts
import { useAuth } from '@/hooks/useAuth'
import { authService } from '@services/authService'
import { Button } from '@components/ui/Button'
```

---

## 🤝 Contributing

1. Create a feature branch from `develop`
2. Make your changes
3. Run `npm run lint && npm run type-check && npm run build`
4. Open a PR using the provided template

---

## 📄 License

MIT — built with ❤️ as a production-ready starting point.
