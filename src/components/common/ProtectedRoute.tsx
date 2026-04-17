import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAppSelector } from '@/hooks/useAppDispatch'

const ProtectedRoute = () => {
  const { isAuthenticated } = useAppSelector(state => state.auth)
  const location = useLocation()

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return <Outlet />
}

export default ProtectedRoute
