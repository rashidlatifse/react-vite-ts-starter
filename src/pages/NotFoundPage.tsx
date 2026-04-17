import { Box, Button, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const NotFoundPage = () => {
  const navigate = useNavigate()
  return (
    <Box
      minHeight="100vh"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
      px={2}
    >
      <Typography variant="h1" fontWeight={800} color="primary" fontSize={{ xs: 80, md: 120 }}>
        404
      </Typography>
      <Typography variant="h5" fontWeight={600} mb={1}>
        Page not found
      </Typography>
      <Typography variant="body1" color="text.secondary" mb={4} maxWidth={400}>
        The page you're looking for doesn't exist or has been moved.
      </Typography>
      <Button variant="contained" size="large" onClick={() => navigate('/dashboard')}>
        Back to Dashboard
      </Button>
    </Box>
  )
}

export default NotFoundPage
