import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { Navbar } from './components/Navbar'
import { PostList } from './pages/PostList'
import { PostDetail } from './pages/PostDetail'
import { Home } from './pages/Home'
import { AdminZone } from './pages/AdminZone'
import { LoginPage } from './pages/LoginPage'
import { AuthProvider } from './context/authContext'
import { ProtectedRoute } from './components/ProtectedRoute'
import { AccessDenied } from './pages/AccessDenied'

export const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Navbar />
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/access-denied" element={<AccessDenied />} />
          <Route
            path="/posts"
            element={
              <ProtectedRoute allowedRoles={['user']}>
                <PostList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/posts/:postId"
            element={
              <ProtectedRoute allowedRoles={['user']}>
                <PostDetail />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin-zone"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminZone />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}
