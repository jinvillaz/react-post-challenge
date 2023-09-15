import { Navigate } from 'react-router-dom'
import { useAuth } from '../../context/authContext'
import { ReactNode } from 'react'

interface ProtectedRouteProps {
  allowedRoles: string[]
  children: ReactNode
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRoles, children }) => {
  const { user } = useAuth()

  const isAllowed = user && allowedRoles.includes(user.role)
  if (!isAllowed) {
    return <Navigate to="/access-denied" />
  }

  return <>{children}</>
}
