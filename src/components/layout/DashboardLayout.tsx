import { useState } from 'react'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  Typography,
  Avatar,
  Menu,
  MenuItem,
  Divider,
  Tooltip,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import {
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  Person as PersonIcon,
  Logout as LogoutIcon,
  Settings as SettingsIcon,
  LightMode,
  DarkMode,
} from '@mui/icons-material'
import { useAppDispatch, useAppSelector } from '@/hooks/useAppDispatch'
import { toggleTheme } from '@/store/slices/uiSlice'
import { useAuth } from '@/hooks/useAuth'

const DRAWER_WIDTH = 260

const navItems = [
  { label: 'Dashboard', path: '/dashboard', icon: <DashboardIcon /> },
  { label: 'Profile', path: '/profile', icon: <PersonIcon /> },
  { label: 'Settings', path: '/settings', icon: <SettingsIcon /> },
]

const DashboardLayout = () => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const [mobileOpen, setMobileOpen] = useState(false)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useAppDispatch()
  const { themeMode } = useAppSelector(state => state.ui)
  const { user, logout } = useAuth()

  const handleDrawerToggle = () => setMobileOpen(prev => !prev)
  const handleMenuOpen = (e: React.MouseEvent<HTMLElement>) => setAnchorEl(e.currentTarget)
  const handleMenuClose = () => setAnchorEl(null)

  const drawerContent = (
    <Box height="100%" display="flex" flexDirection="column">
      {/* Brand */}
      <Box px={3} py={2.5} borderBottom="1px solid" borderColor="divider">
        <Typography variant="h6" fontWeight={700} color="primary">
          MyApp
        </Typography>
      </Box>

      {/* Nav Items */}
      <List sx={{ px: 1, py: 2, flex: 1 }}>
        {navItems.map(item => (
          <ListItem key={item.path} disablePadding sx={{ mb: 0.5 }}>
            <ListItemButton
              selected={location.pathname === item.path}
              onClick={() => {
                navigate(item.path)
                if (isMobile) setMobileOpen(false)
              }}
              sx={{
                borderRadius: 2,
                '&.Mui-selected': {
                  backgroundColor: 'primary.main',
                  color: 'white',
                  '& .MuiListItemIcon-root': { color: 'white' },
                  '&:hover': { backgroundColor: 'primary.dark' },
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: 40 }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      {/* User info at bottom */}
      <Box px={2} py={2} borderTop="1px solid" borderColor="divider">
        <Box display="flex" alignItems="center" gap={1.5}>
          <Avatar sx={{ width: 36, height: 36, bgcolor: 'primary.main' }}>
            {user?.firstName?.[0]}
          </Avatar>
          <Box flex={1} overflow="hidden">
            <Typography variant="body2" fontWeight={600} noWrap>
              {user?.firstName} {user?.lastName}
            </Typography>
            <Typography variant="caption" color="text.secondary" noWrap>
              {user?.email}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  )

  return (
    <Box display="flex" minHeight="100vh">
      {/* Sidebar */}
      <Box component="nav" width={{ md: DRAWER_WIDTH }} flexShrink={{ md: 0 }}>
        <Drawer
          variant={isMobile ? 'temporary' : 'permanent'}
          open={isMobile ? mobileOpen : true}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            '& .MuiDrawer-paper': {
              width: DRAWER_WIDTH,
              boxSizing: 'border-box',
              borderRight: '1px solid',
              borderColor: 'divider',
            },
          }}
        >
          {drawerContent}
        </Drawer>
      </Box>

      {/* Main content */}
      <Box flex={1} display="flex" flexDirection="column" overflow="hidden">
        {/* Top AppBar */}
        <AppBar
          position="sticky"
          elevation={0}
          sx={{
            backgroundColor: 'background.paper',
            borderBottom: '1px solid',
            borderColor: 'divider',
            color: 'text.primary',
          }}
        >
          <Toolbar>
            {isMobile && (
              <IconButton edge="start" onClick={handleDrawerToggle} sx={{ mr: 2 }}>
                <MenuIcon />
              </IconButton>
            )}
            <Typography variant="h6" fontWeight={600} flex={1}>
              {navItems.find(i => i.path === location.pathname)?.label || 'Dashboard'}
            </Typography>

            {/* Theme toggle */}
            <Tooltip title="Toggle theme">
              <IconButton onClick={() => dispatch(toggleTheme())} sx={{ mr: 1 }}>
                {themeMode === 'dark' ? <LightMode /> : <DarkMode />}
              </IconButton>
            </Tooltip>

            {/* User avatar menu */}
            <Tooltip title="Account">
              <IconButton onClick={handleMenuOpen}>
                <Avatar sx={{ width: 34, height: 34, bgcolor: 'primary.main', fontSize: 14 }}>
                  {user?.firstName?.[0]}
                </Avatar>
              </IconButton>
            </Tooltip>

            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              transformOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
              PaperProps={{ sx: { mt: 1, minWidth: 180 } }}
            >
              <MenuItem
                onClick={() => {
                  navigate('/profile')
                  handleMenuClose()
                }}
              >
                <ListItemIcon>
                  <PersonIcon fontSize="small" />
                </ListItemIcon>
                Profile
              </MenuItem>
              <Divider />
              <MenuItem
                onClick={() => {
                  logout()
                  handleMenuClose()
                }}
                sx={{ color: 'error.main' }}
              >
                <ListItemIcon>
                  <LogoutIcon fontSize="small" color="error" />
                </ListItemIcon>
                Logout
              </MenuItem>
            </Menu>
          </Toolbar>
        </AppBar>

        {/* Page Content */}
        <Box flex={1} p={3} sx={{ backgroundColor: 'background.default', overflow: 'auto' }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  )
}

export default DashboardLayout
