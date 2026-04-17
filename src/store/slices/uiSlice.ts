import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { ThemeMode } from '@/types'

interface Notification {
  id: string
  message: string
  severity: 'success' | 'error' | 'warning' | 'info'
}

interface UIState {
  themeMode: ThemeMode
  sidebarOpen: boolean
  notifications: Notification[]
}

const initialState: UIState = {
  themeMode: (localStorage.getItem('themeMode') as ThemeMode) || 'light',
  sidebarOpen: true,
  notifications: [],
}

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleTheme: state => {
      state.themeMode = state.themeMode === 'light' ? 'dark' : 'light'
      localStorage.setItem('themeMode', state.themeMode)
    },
    setTheme: (state, action: PayloadAction<ThemeMode>) => {
      state.themeMode = action.payload
      localStorage.setItem('themeMode', action.payload)
    },
    toggleSidebar: state => {
      state.sidebarOpen = !state.sidebarOpen
    },
    addNotification: (state, action: PayloadAction<Omit<Notification, 'id'>>) => {
      state.notifications.push({
        ...action.payload,
        id: Date.now().toString(),
      })
    },
    removeNotification: (state, action: PayloadAction<string>) => {
      state.notifications = state.notifications.filter(n => n.id !== action.payload)
    },
  },
})

export const { toggleTheme, setTheme, toggleSidebar, addNotification, removeNotification } =
  uiSlice.actions
export default uiSlice.reducer
