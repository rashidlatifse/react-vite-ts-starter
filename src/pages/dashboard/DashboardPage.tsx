import { Box, Grid, Card, CardContent, Typography, Avatar, Chip } from '@mui/material'
import { TrendingUp, People, Assignment, CheckCircle } from '@mui/icons-material'
import { useAppSelector } from '@/hooks/useAppDispatch'

const stats = [
  { label: 'Total Users', value: '12,430', icon: <People />, color: '#3b82f6', trend: '+12%' },
  { label: 'Revenue', value: '$48,295', icon: <TrendingUp />, color: '#10b981', trend: '+8.2%' },
  { label: 'Tasks', value: '284', icon: <Assignment />, color: '#f59e0b', trend: '+3.1%' },
  { label: 'Completed', value: '1,093', icon: <CheckCircle />, color: '#8b5cf6', trend: '+5.4%' },
]

const DashboardPage = () => {
  const { user } = useAppSelector(state => state.auth)

  return (
    <Box>
      {/* Welcome Header */}
      <Box mb={4}>
        <Typography variant="h4" fontWeight={700} mb={0.5}>
          Welcome back, {user?.firstName || 'User'} 👋
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Here's what's happening with your project today.
        </Typography>
      </Box>

      {/* Stats Grid */}
      <Grid container spacing={3} mb={4}>
        {stats.map(stat => (
          <Grid item xs={12} sm={6} lg={3} key={stat.label}>
            <Card
              elevation={0}
              sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 3 }}
            >
              <CardContent sx={{ p: 3 }}>
                <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
                  <Avatar
                    sx={{ bgcolor: `${stat.color}20`, color: stat.color, width: 44, height: 44 }}
                  >
                    {stat.icon}
                  </Avatar>
                  <Chip
                    label={stat.trend}
                    size="small"
                    sx={{ bgcolor: '#10b98120', color: '#10b981', fontWeight: 600 }}
                  />
                </Box>
                <Typography variant="h5" fontWeight={700}>
                  {stat.value}
                </Typography>
                <Typography variant="body2" color="text.secondary" mt={0.5}>
                  {stat.label}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Placeholder content */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card elevation={0} sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 3 }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" fontWeight={600} mb={2}>
                Recent Activity
              </Typography>
              <Box
                height={200}
                display="flex"
                alignItems="center"
                justifyContent="center"
                sx={{ bgcolor: 'background.default', borderRadius: 2 }}
              >
                <Typography color="text.secondary">Chart goes here</Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card elevation={0} sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 3 }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" fontWeight={600} mb={2}>
                Quick Stats
              </Typography>
              <Box
                height={200}
                display="flex"
                alignItems="center"
                justifyContent="center"
                sx={{ bgcolor: 'background.default', borderRadius: 2 }}
              >
                <Typography color="text.secondary">Stats go here</Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  )
}

export default DashboardPage
