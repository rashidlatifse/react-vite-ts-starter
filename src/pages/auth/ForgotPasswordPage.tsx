import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Box, Button, TextField, Typography, Alert } from '@mui/material'
import { authService } from '@/services/authService'

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('')
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      await authService.forgotPassword(email)
      setSuccess(true)
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Something went wrong. Please try again.'
      setError(message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Typography variant="h5" fontWeight={700} mb={0.5}>
        Reset password
      </Typography>
      <Typography variant="body2" color="text.secondary" mb={3}>
        Enter your email and we'll send you a reset link
      </Typography>

      {success ? (
        <Alert severity="success" sx={{ mb: 2 }}>
          Password reset email sent! Please check your inbox.
        </Alert>
      ) : (
        <>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
          <TextField
            fullWidth
            label="Email"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            sx={{ mb: 3 }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            size="large"
            disabled={loading}
            sx={{ mb: 2 }}
          >
            {loading ? 'Sending...' : 'Send reset link'}
          </Button>
        </>
      )}

      <Link to="/login" style={{ textDecoration: 'none' }}>
        <Typography variant="body2" color="primary" textAlign="center">
          ← Back to sign in
        </Typography>
      </Link>
    </Box>
  )
}

export default ForgotPasswordPage
