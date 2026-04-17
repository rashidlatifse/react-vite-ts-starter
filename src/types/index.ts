// Global API types
export interface ApiResponse<T> {
  data: T
  message: string
  success: boolean
  statusCode: number
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
  totalPages: number
}

export interface ApiError {
  message: string
  statusCode: number
  errors?: Record<string, string[]>
}

// Auth types
export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  role: UserRole
  avatar?: string
  createdAt: string
  updatedAt: string
}

export type UserRole = 'admin' | 'user' | 'moderator'

export interface AuthTokens {
  accessToken: string
  refreshToken: string
  expiresIn: number
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterCredentials {
  email: string
  password: string
  firstName: string
  lastName: string
}

// UI types
export type ThemeMode = 'light' | 'dark'

export interface SelectOption<T = string> {
  label: string
  value: T
  disabled?: boolean
}

export interface BreadcrumbItem {
  label: string
  path?: string
}
