import { Outlet } from 'react-router-dom'
import { ThemeProvider, CssBaseline } from '@mui/material'
import { useAppSelector } from '@/hooks/useAppDispatch'
import { lightTheme, darkTheme } from '@/lib/theme'
import GlobalNotifications from '@/components/common/GlobalNotifications'

const RootLayout = () => {
  const { themeMode } = useAppSelector(state => state.ui)
  const theme = themeMode === 'dark' ? darkTheme : lightTheme

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalNotifications />
      <Outlet />
    </ThemeProvider>
  )
}

export default RootLayout
