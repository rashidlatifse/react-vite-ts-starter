import axiosInstance from '@/lib/axios'
import type { ApiResponse, AuthTokens, LoginCredentials, RegisterCredentials, User } from '@/types'

export const authService = {
  login: async (credentials: LoginCredentials): Promise<ApiResponse<{ user: User; tokens: AuthTokens }>> => {
    const { data } = await axiosInstance.post('/auth/login', credentials)
    return data
  },

  register: async (credentials: RegisterCredentials): Promise<ApiResponse<{ user: User; tokens: AuthTokens }>> => {
    const { data } = await axiosInstance.post('/auth/register', credentials)
    return data
  },

  logout: async (): Promise<void> => {
    const refreshToken = localStorage.getItem('refreshToken')
    await axiosInstance.post('/auth/logout', { refreshToken })
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
  },

  refreshToken: async (refreshToken: string): Promise<ApiResponse<AuthTokens>> => {
    const { data } = await axiosInstance.post('/auth/refresh', { refreshToken })
    return data
  },

  getMe: async (): Promise<ApiResponse<User>> => {
    const { data } = await axiosInstance.get('/auth/me')
    return data
  },

  forgotPassword: async (email: string): Promise<ApiResponse<null>> => {
    const { data } = await axiosInstance.post('/auth/forgot-password', { email })
    return data
  },

  resetPassword: async (token: string, password: string): Promise<ApiResponse<null>> => {
    const { data } = await axiosInstance.post('/auth/reset-password', { token, password })
    return data
  },
}
