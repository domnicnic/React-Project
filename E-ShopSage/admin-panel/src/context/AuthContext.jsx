import React, { createContext, useContext, useState, useEffect } from 'react'
import { apiService } from '../services/api'

const AuthContext = createContext()

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        const token = localStorage.getItem('token')
        const savedUser = localStorage.getItem('user')
        if (token && savedUser) {
            try {
                const userData = JSON.parse(savedUser)
                setUser(userData)
                setIsAuthenticated(true)
            } catch (error) {
                localStorage.removeItem('token')
                localStorage.removeItem('user')
            }
        } else {
            console.log('No saved user data found in localStorage')
        }
        setLoading(false)
    }, [])

    const login = (userData, token) => {
        localStorage.setItem('token', token)
        localStorage.setItem('user', JSON.stringify(userData))
        setUser(userData)
        setIsAuthenticated(true)
    }

    const logout = async () => {
        try {
            // Call logout API
            await apiService.logout()
            console.log('Logout successful')
        } catch (error) {
            console.error('Logout error:', error)
            // Continue with local logout even if API fails
        } finally {
            // Always clear local storage and state
            localStorage.removeItem('token')
            localStorage.removeItem('user')
            setUser(null)
            setIsAuthenticated(false)
        }
    }

    // Update user data (useful for profile updates)
    const updateUser = (newUserData) => {
        const updatedUser = { ...user, ...newUserData }
        localStorage.setItem('user', JSON.stringify(updatedUser))
        setUser(updatedUser)
    }

    // Get specific user property
    const getUserProperty = (property) => {
        return user?.[property] || null
    }

    // Check if user has specific role
    const hasRole = (role) => {
        return user?.role === role || user?.userType === role
    }

    // Check if user has specific permission
    const hasPermission = (permission) => {
        return user?.permissions?.includes(permission) || false
    }

    const value = {
        isAuthenticated,
        user,
        login,
        logout,
        updateUser,
        getUserProperty,
        hasRole,
        hasPermission,
        loading
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
} 