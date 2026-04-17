import { useCallback } from 'react'
import { useAppDispatch } from '@/hooks/useAppDispatch'
import { addNotification, removeNotification } from '@/store/slices/uiSlice'

export const useNotification = () => {
  const dispatch = useAppDispatch()

  const notify = useCallback(
    (message: string, severity: 'success' | 'error' | 'warning' | 'info' = 'info') => {
      dispatch(addNotification({ message, severity }))
    },
    [dispatch]
  )

  const dismiss = useCallback(
    (id: string) => {
      dispatch(removeNotification(id))
    },
    [dispatch]
  )

  return {
    notify,
    success: (msg: string) => notify(msg, 'success'),
    error: (msg: string) => notify(msg, 'error'),
    warning: (msg: string) => notify(msg, 'warning'),
    info: (msg: string) => notify(msg, 'info'),
    dismiss,
  }
}
