import { Outlet } from 'react-router-dom'
import { Box, Paper, Typography } from '@mui/material'

const AuthLayout = () => {
  return (
    <Box
      minHeight="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      className="bg-gradient-to-br from-primary-50 to-primary-100"
      sx={{ backgroundColor: 'background.default' }}
    >
      <Box width="100%" maxWidth={460} px={2}>
        {/* Logo / Brand */}
        <Box textAlign="center" mb={4}>
          <Typography variant="h4" fontWeight={700} color="primary">
            MyApp
          </Typography>
          <Typography variant="body2" color="text.secondary" mt={0.5}>
            Welcome back
          </Typography>
        </Box>

        <Paper
          elevation={0}
          sx={{
            p: 4,
            borderRadius: 3,
            border: '1px solid',
            borderColor: 'divider',
          }}
        >
          <Outlet />
        </Paper>
      </Box>
    </Box>
  )
}

export default AuthLayout
