import { http, HttpResponse } from 'msw'

const BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api'

const DEMO_USER = {
  id: '1',
  email: 'demo@example.com',
  firstName: 'Demo',
  lastName: 'User',
  role: 'admin' as const,
  avatar: undefined,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
}

const TOKENS = {
  accessToken: 'mock-access-token',
  refreshToken: 'mock-refresh-token',
  expiresIn: 900,
}

const users: typeof DEMO_USER[] = [{ ...DEMO_USER }]

export const handlers = [
  http.post(`${BASE}/auth/login`, async ({ request }) => {
    const body = (await request.json()) as { email: string; password: string }
    const user = users.find(u => u.email === body.email)
    if (!user || body.password !== 'password123') {
      return HttpResponse.json(
        { success: false, message: 'Invalid email or password', statusCode: 401, data: null },
        { status: 401 }
      )
    }
    return HttpResponse.json({
      success: true,
      message: 'Login successful',
      statusCode: 200,
      data: { user, tokens: TOKENS },
    })
  }),

  http.post(`${BASE}/auth/register`, async ({ request }) => {
    const body = (await request.json()) as {
      email: string
      password: string
      firstName: string
      lastName: string
    }
    if (users.find(u => u.email === body.email)) {
      return HttpResponse.json(
        { success: false, message: 'Email already in use', statusCode: 409, data: null },
        { status: 409 }
      )
    }
    const newUser = {
      id: String(users.length + 1),
      email: body.email,
      firstName: body.firstName,
      lastName: body.lastName,
      role: 'user' as const,
      avatar: undefined,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    users.push(newUser)
    return HttpResponse.json({
      success: true,
      message: 'Registration successful',
      statusCode: 201,
      data: { user: newUser, tokens: TOKENS },
    })
  }),

  http.post(`${BASE}/auth/logout`, () => {
    return HttpResponse.json({ success: true, message: 'Logged out', statusCode: 200, data: null })
  }),

  http.post(`${BASE}/auth/refresh`, () => {
    return HttpResponse.json({
      success: true,
      message: 'Token refreshed',
      statusCode: 200,
      data: TOKENS,
    })
  }),

  http.get(`${BASE}/auth/me`, () => {
    return HttpResponse.json({
      success: true,
      message: 'User fetched',
      statusCode: 200,
      data: DEMO_USER,
    })
  }),

  http.post(`${BASE}/auth/forgot-password`, () => {
    return HttpResponse.json({
      success: true,
      message: 'Reset email sent',
      statusCode: 200,
      data: null,
    })
  }),

  http.post(`${BASE}/auth/reset-password`, () => {
    return HttpResponse.json({
      success: true,
      message: 'Password reset successful',
      statusCode: 200,
      data: null,
    })
  }),
]
