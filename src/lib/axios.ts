import axios from 'axios'
import type { AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios'

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api'
const TIMEOUT = Number(import.meta.env.VITE_API_TIMEOUT) || 10000

const axiosInstance: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
})

// Request Interceptor — attach JWT token
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('accessToken')
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  error => Promise.reject(error)
)

// Response Interceptor — handle token refresh & errors
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  async error => {
    const originalRequest = error.config

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      try {
        const refreshToken = localStorage.getItem('refreshToken')
        if (!refreshToken) throw new Error('No refresh token')

        const { data } = await axios.post(`${BASE_URL}/auth/refresh`, { refreshToken })
        const { accessToken } = data

        localStorage.setItem('accessToken', accessToken)
        originalRequest.headers.Authorization = `Bearer ${accessToken}`

        return axiosInstance(originalRequest)
      } catch {
        // Refresh failed — clear tokens and redirect to login
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
        window.location.href = '/login'
        return Promise.reject(error)
      }
    }

    return Promise.reject(error)
  }
)

export default axiosInstance
