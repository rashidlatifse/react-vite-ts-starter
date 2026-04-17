import { Box, Card, CardContent, Typography, Avatar, Chip, Divider, Grid } from '@mui/material'
import { Email, Badge, CalendarToday } from '@mui/icons-material'
import { useAppSelector } from '@/hooks/useAppDispatch'

const ProfilePage = () => {
  const { user } = useAppSelector(state => state.auth)

  return (
    <Box maxWidth={800}>
      <Typography variant="h4" fontWeight={700} mb={3}>
        Profile
      </Typography>

      <Card elevation={0} sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 3 }}>
        <CardContent sx={{ p: 4 }}>
          {/* Avatar section */}
          <Box display="flex" alignItems="center" gap={3} mb={4}>
            <Avatar sx={{ width: 80, height: 80, bgcolor: 'primary.main', fontSize: 32 }}>
              {user?.firstName?.[0]}
            </Avatar>
            <Box>
              <Typography variant="h5" fontWeight={700}>
                {user?.firstName} {user?.lastName}
              </Typography>
              <Typography variant="body2" color="text.secondary" mb={1}>
                {user?.email}
              </Typography>
              <Chip
                label={user?.role || 'user'}
                size="small"
                color="primary"
                variant="outlined"
                sx={{ textTransform: 'capitalize' }}
              />
            </Box>
          </Box>

          <Divider sx={{ mb: 3 }} />

          {/* Details */}
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <Box display="flex" alignItems="center" gap={1.5}>
                <Badge color="action" />
                <Box>
                  <Typography variant="caption" color="text.secondary">
                    First Name
                  </Typography>
                  <Typography variant="body1" fontWeight={500}>
                    {user?.firstName || '—'}
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box display="flex" alignItems="center" gap={1.5}>
                <Badge color="action" />
                <Box>
                  <Typography variant="caption" color="text.secondary">
                    Last Name
                  </Typography>
                  <Typography variant="body1" fontWeight={500}>
                    {user?.lastName || '—'}
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box display="flex" alignItems="center" gap={1.5}>
                <Email color="action" />
                <Box>
                  <Typography variant="caption" color="text.secondary">
                    Email
                  </Typography>
                  <Typography variant="body1" fontWeight={500}>
                    {user?.email || '—'}
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box display="flex" alignItems="center" gap={1.5}>
                <CalendarToday color="action" />
                <Box>
                  <Typography variant="caption" color="text.secondary">
                    Member Since
                  </Typography>
                  <Typography variant="body1" fontWeight={500}>
                    {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : '—'}
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  )
}

export default ProfilePage
