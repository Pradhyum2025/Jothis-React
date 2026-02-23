import { Navigate, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'

/**
 * Wraps dashboard routes - redirects to login if not authenticated
 */
export function ProtectedRoute({ children }) {
  const { isAuthenticated } = useSelector((state) => state.auth)
  const location = useLocation()

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return children
}
