import { Snackbar, Alert } from '@mui/material'
import { useAppSelector } from '@/hooks/useAppDispatch'
import { useNotification } from '@/hooks/useNotification'

const GlobalNotifications = () => {
  const { notifications } = useAppSelector(state => state.ui)
  const { dismiss } = useNotification()

  return (
    <>
      {notifications.map(notification => (
        <Snackbar
          key={notification.id}
          open
          autoHideDuration={5000}
          onClose={() => dismiss(notification.id)}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <Alert
            onClose={() => dismiss(notification.id)}
            severity={notification.severity}
            variant="filled"
            sx={{ width: '100%' }}
          >
            {notification.message}
          </Alert>
        </Snackbar>
      ))}
    </>
  )
}

export default GlobalNotifications
