import React, { createContext, useContext, useEffect, useState } from 'react'

import { User } from '../model/user'
import { userService } from '../services/user.service'
import { useNavigate } from 'react-router-dom'
import { ADMIN } from '../constants'
import { notificationService } from '../services/notification.service'

const AuthContext = createContext<
  | {
      user: User | null
      login: (email: string, password: string) => void
      logout: () => void
    }
  | undefined
>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth should be user inside AuthProvider')
  }
  return context
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate()
  const [user, setUser] = useState<User | null>(null)

  const login = (email: string, password: string) => {
    try {
      const userData = userService.login(email, password)
      setUser(userData)
      localStorage.setItem('user', JSON.stringify(userData))
      let route = '/posts'
      if (userData.role === ADMIN) {
        route = '/admin-zone'
      }
      navigate(route)
    } catch (e) {
      notificationService.handleError(e)
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('user')
    navigate('/login')
  }

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      const userData = JSON.parse(storedUser) as User
      setUser(userData)
      let route = '/posts'
      if (userData.role === ADMIN) {
        route = '/admin-zone'
      }
      navigate(route)
    }
  }, [])

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>
}
