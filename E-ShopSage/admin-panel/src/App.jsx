import './App.css'
import './styles.css'
import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import LoginPage from './backend/Pages/Admin/login'
import Dashboard from './backend/Pages/Admin/dashboard'
import Profile from './backend/Pages/Admin/profile'
import EditProfile from './backend/Pages/Admin/edit-profile'
import ProtectedRoute from './components/ProtectedRoute'
import { setPageTitle } from './utils/titleManager'
import User from './backend/Pages/User/index'
import ViewUser from './backend/Pages/User/view-user'
function App() {
  const location = useLocation()
  useEffect(() => {
    const path = location.pathname
    switch (path) {
      case '/':
      case '/login':
        setPageTitle.login()
        break
      case '/dashboard':
        setPageTitle.dashboard()
        break
      case '/profile':
        setPageTitle.profile()
        break
      case '/profile/edit':
        setPageTitle.editProfile()
        break
      default:
        // For any other routes, you can add more cases
        setPageTitle.dashboard()
        break
    }
  }, [location.pathname])
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route 
        path="/dashboard" 
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/profile" 
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/profile/edit" 
        element={
          <ProtectedRoute>
            <EditProfile />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/users" 
        element={
          <ProtectedRoute>
            <User />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/view-user/:id" 
        element={
          <ProtectedRoute>
            <ViewUser />
          </ProtectedRoute>
        } 
      />
    </Routes>
  )
}
export default App
