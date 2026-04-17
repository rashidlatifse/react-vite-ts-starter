import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Box,
  Button,
  TextField,
  Typography,
  InputAdornment,
  IconButton,
  Alert,
  Divider,
} from '@mui/material'
import { Visibility, VisibilityOff, Email, Lock } from '@mui/icons-material'
import { useAuth } from '@/hooks/useAuth'
import type { LoginCredentials } from '@/types'

const LoginPage = () => {
  const { login } = useAuth()
  const [credentials, setCredentials] = useState<LoginCredentials>({ email: '', password: '' })
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials(prev => ({ ...prev, [e.target.name]: e.target.value }))
    setError(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      await login(credentials)
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Login failed. Please try again.'
      setError(message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Typography variant="h5" fontWeight={700} mb={0.5}>
        Sign in
      </Typography>
      <Typography variant="body2" color="text.secondary" mb={3}>
        Enter your credentials to access your account
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <TextField
        fullWidth
        label="Email"
        name="email"
        type="email"
        value={credentials.email}
        onChange={handleChange}
        required
        sx={{ mb: 2 }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Email fontSize="small" color="action" />
            </InputAdornment>
          ),
        }}
      />

      <TextField
        fullWidth
        label="Password"
        name="password"
        type={showPassword ? 'text' : 'password'}
        value={credentials.password}
        onChange={handleChange}
        required
        sx={{ mb: 1 }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Lock fontSize="small" color="action" />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={() => setShowPassword(v => !v)} edge="end">
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      <Box textAlign="right" mb={3}>
        <Link to="/forgot-password" style={{ textDecoration: 'none' }}>
          <Typography variant="body2" color="primary">
            Forgot password?
          </Typography>
        </Link>
      </Box>

      <Button
        type="submit"
        fullWidth
        variant="contained"
        size="large"
        disabled={loading}
        sx={{ mb: 3 }}
      >
        {loading ? 'Signing in...' : 'Sign in'}
      </Button>

      <Divider sx={{ mb: 3 }} />

      <Typography variant="body2" textAlign="center" color="text.secondary">
        Don't have an account?{' '}
        <Link to="/register" style={{ textDecoration: 'none' }}>
          <Typography component="span" variant="body2" color="primary" fontWeight={500}>
            Sign up
          </Typography>
        </Link>
      </Typography>
    </Box>
  )
}

export default LoginPage
