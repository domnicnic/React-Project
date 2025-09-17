import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const ProtectedRoute = ({ 
    children, 
    requiredRole = null, 
    requiredPermissions = [],
    redirectTo = '/login',
    fallbackComponent = null 
}) => {
    const { user, isAuthenticated, loading, hasRole, hasPermission } = useAuth()
    const location = useLocation()
    // Show loading spinner while checking authentication
    if (loading) {
        return (
            <div className="auth-loading-container">
                <div className="auth-loading-spinner">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                    <p className="mt-3 text-muted">Checking authentication...</p>
                </div>
            </div>
        )
    }
    // Redirect to login if not authenticated
    if (!isAuthenticated || !user) {
        return <Navigate to={redirectTo} state={{ from: location }} replace />
    }
    // Check role-based access
    if (requiredRole && !hasRole(requiredRole)) {
        if (fallbackComponent) {
            return fallbackComponent
        }
        return (
            <div className="access-denied-container">
                <div className="access-denied-content">
                    <i className="fas fa-lock access-denied-icon"></i>
                    <h3>Access Denied</h3>
                    <p>You don't have permission to access this page.</p>
                    <p className="text-muted">Required role: {requiredRole}</p>
                    <button 
                        className="btn btn-primary"
                        onClick={() => window.history.back()}
                    >
                        Go Back
                    </button>
                </div>
            </div>
        )
    }

    // Check permission-based access
    if (requiredPermissions.length > 0) {
        const hasAllPermissions = requiredPermissions.every(permission => 
            hasPermission(permission)
        )
        
        if (!hasAllPermissions) {
            if (fallbackComponent) {
                return fallbackComponent
            }
            return (
                <div className="access-denied-container">
                    <div className="access-denied-content">
                        <i className="fas fa-shield-alt access-denied-icon"></i>
                        <h3>Access Denied</h3>
                        <p>You don't have the required permissions to access this page.</p>
                        <p className="text-muted">
                            Required permissions: {requiredPermissions.join(', ')}
                        </p>
                        <button 
                            className="btn btn-primary"
                            onClick={() => window.history.back()}
                        >
                            Go Back
                        </button>
                    </div>
                </div>
            )
        }
    }

    // Render the protected content if all checks pass
    return children
}

export default ProtectedRoute 