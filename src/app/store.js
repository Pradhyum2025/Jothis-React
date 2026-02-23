import { configureStore } from '@reduxjs/toolkit'
import authReducer from '@/features/auth/authSlice'
import employeeReducer from '@/features/employees/employeeSlice'

const AUTH_STORAGE_KEY = 'employee_dashboard_auth'

function loadAuthFromStorage() {
  try {
    const raw = localStorage.getItem(AUTH_STORAGE_KEY)
    if (!raw) return undefined
    const data = JSON.parse(raw)
    if (data && typeof data.isAuthenticated === 'boolean' && data.user) {
      return { auth: { isAuthenticated: data.isAuthenticated, user: data.user } }
    }
  } catch (_) {}
  return undefined
}

export const store = configureStore({
  reducer: {
    auth: authReducer,
    employees: employeeReducer,
  },
  preloadedState: loadAuthFromStorage(),
})

// Persist auth to localStorage whenever auth state changes
store.subscribe(() => {
  const state = store.getState()
  try {
    if (state.auth.isAuthenticated && state.auth.user) {
      localStorage.setItem(
        AUTH_STORAGE_KEY,
        JSON.stringify({
          isAuthenticated: true,
          user: state.auth.user,
        })
      )
    } else {
      localStorage.removeItem(AUTH_STORAGE_KEY)
    }
  } catch (_) {}
})
