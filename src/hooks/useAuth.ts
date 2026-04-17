import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '@/hooks/useAppDispatch'
import { setCredentials, setUser, logout as logoutAction } from '@/store/slices/authSlice'
import { authService } from '@/services/authService'
import type { LoginCredentials, RegisterCredentials } from '@/types'

export const useAuth = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { user, isAuthenticated, isLoading, accessToken } = useAppSelector(state => state.auth)

  const login = useCallback(
    async (credentials: LoginCredentials) => {
      const response = await authService.login(credentials)
      const { user, tokens } = response.data
      dispatch(
        setCredentials({
          user,
          accessToken: tokens.accessToken,
          refreshToken: tokens.refreshToken,
        })
      )
      navigate('/dashboard')
      return response
    },
    [dispatch, navigate]
  )

  const register = useCallback(
    async (credentials: RegisterCredentials) => {
      const response = await authService.register(credentials)
      const { user, tokens } = response.data
      dispatch(
        setCredentials({
          user,
          accessToken: tokens.accessToken,
          refreshToken: tokens.refreshToken,
        })
      )
      navigate('/dashboard')
      return response
    },
    [dispatch, navigate]
  )

  const logout = useCallback(async () => {
    try {
      await authService.logout()
    } finally {
      dispatch(logoutAction())
      navigate('/login')
    }
  }, [dispatch, navigate])

  const fetchProfile = useCallback(async () => {
    const response = await authService.getMe()
    dispatch(setUser(response.data))
    return response.data
  }, [dispatch])

  return {
    user,
    isAuthenticated,
    isLoading,
    accessToken,
    login,
    register,
    logout,
    fetchProfile,
  }
}
