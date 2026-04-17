import { createBrowserRouter, Navigate } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import RootLayout from '@/components/layout/RootLayout'
import AuthLayout from '@/components/layout/AuthLayout'
import DashboardLayout from '@/components/layout/DashboardLayout'
import ProtectedRoute from '@/components/common/ProtectedRoute'
import PublicRoute from '@/components/common/PublicRoute'
import PageLoader from '@/components/common/PageLoader'

// Lazy-loaded pages
const LoginPage = lazy(() => import('@/pages/auth/LoginPage'))
const RegisterPage = lazy(() => import('@/pages/auth/RegisterPage'))
const ForgotPasswordPage = lazy(() => import('@/pages/auth/ForgotPasswordPage'))
const DashboardPage = lazy(() => import('@/pages/dashboard/DashboardPage'))
const ProfilePage = lazy(() => import('@/pages/dashboard/ProfilePage'))
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage'))

const withSuspense = (Component: React.ComponentType) => (
  <Suspense fallback={<PageLoader />}>
    <Component />
  </Suspense>
)

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="/dashboard" replace />,
      },
      // Auth routes (public only)
      {
        element: <PublicRoute />,
        children: [
          {
            element: <AuthLayout />,
            children: [
              {
                path: 'login',
                element: withSuspense(LoginPage),
              },
              {
                path: 'register',
                element: withSuspense(RegisterPage),
              },
              {
                path: 'forgot-password',
                element: withSuspense(ForgotPasswordPage),
              },
            ],
          },
        ],
      },
      // Protected routes
      {
        element: <ProtectedRoute />,
        children: [
          {
            element: <DashboardLayout />,
            children: [
              {
                path: 'dashboard',
                element: withSuspense(DashboardPage),
              },
              {
                path: 'profile',
                element: withSuspense(ProfilePage),
              },
            ],
          },
        ],
      },
      // 404
      {
        path: '*',
        element: withSuspense(NotFoundPage),
      },
    ],
  },
])
