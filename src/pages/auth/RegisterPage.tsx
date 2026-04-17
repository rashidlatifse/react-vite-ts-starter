import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Box, Button, TextField, Typography, Alert, Divider } from '@mui/material'
import { useAuth } from '@/hooks/useAuth'
import type { RegisterCredentials } from '@/types'

const RegisterPage = () => {
  const { register } = useAuth()
  const [form, setForm] = useState<RegisterCredentials>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  })
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
    setError(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      await register(form)
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Registration failed. Please try again.'
      setError(message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Typography variant="h5" fontWeight={700} mb={0.5}>
        Create account
      </Typography>
      <Typography variant="body2" color="text.secondary" mb={3}>
        Fill in your details to get started
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Box display="flex" gap={2} mb={2}>
        <TextField
          fullWidth
          label="First Name"
          name="firstName"
          value={form.firstName}
          onChange={handleChange}
          required
        />
        <TextField
          fullWidth
          label="Last Name"
          name="lastName"
          value={form.lastName}
          onChange={handleChange}
          required
        />
      </Box>

      <TextField
        fullWidth
        label="Email"
        name="email"
        type="email"
        value={form.email}
        onChange={handleChange}
        required
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Password"
        name="password"
        type="password"
        value={form.password}
        onChange={handleChange}
        required
        sx={{ mb: 3 }}
        helperText="Minimum 8 characters"
      />

      <Button
        type="submit"
        fullWidth
        variant="contained"
        size="large"
        disabled={loading}
        sx={{ mb: 3 }}
      >
        {loading ? 'Creating account...' : 'Create account'}
      </Button>

      <Divider sx={{ mb: 3 }} />

      <Typography variant="body2" textAlign="center" color="text.secondary">
        Already have an account?{' '}
        <Link to="/login" style={{ textDecoration: 'none' }}>
          <Typography component="span" variant="body2" color="primary" fontWeight={500}>
            Sign in
          </Typography>
        </Link>
      </Typography>
    </Box>
  )
}

export default RegisterPage
