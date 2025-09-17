const API_BASE_URL = 'http://localhost:8001'

// Helper function to get auth headers
const getAuthHeaders = () => {
    const token = localStorage.getItem('token')
    return {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` })
    }
}

// API service functions
export const apiService = {
    // Admin Login
    login: async (email, password) => {
        const response = await fetch(`${API_BASE_URL}/api/admin-action`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        })
        
        if (!response.ok) {
            const errorData = await response.json()
            throw new Error(errorData.message || 'Login failed')
        }
        
        return response.json()
    },
    // Admin Logout
    logout: async () => {
        const response = await fetch(`${API_BASE_URL}/api/admin-logout`, {
            method: 'POST',
            headers: getAuthHeaders()
        })
        
        if (!response.ok) {
            const errorData = await response.json()
            throw new Error(errorData.message || 'Logout failed')
        }
        
        return response.json()
    },

    // Get Admin Profile by ID
    getProfileById: async (id) => {
        const response = await fetch(`${API_BASE_URL}/api/admin-profile?id=${id}`, {
            method: 'GET',
            headers: getAuthHeaders()
        })
        if (!response.ok) {
            const errorData = await response.json()
            throw new Error(errorData.message || 'Failed to get profile')
        }
        return response.json()
    },
    
    // Get Users
    getUsers: async () => {
        const response = await fetch(`${API_BASE_URL}/api/users`, {
            method: 'GET',
            headers: getAuthHeaders()
        })
        
        if (!response.ok) {
            const errorData = await response.json()
            throw new Error(errorData.message || 'Failed to get users')
        }
        return response.json()
    },
    // Get User by ID
    viewUser: async (userId) => {
        const response = await fetch(`${API_BASE_URL}/api/view-user/${userId}`, {
            method: 'GET',
            headers: getAuthHeaders()
        })
        if (!response.ok) {
            const errorData = await response.json()
            throw new Error(errorData.message || 'Failed to get user details')
        }
        return response.json()
    },

    // Delete User
    deleteUser: async (userId) => {
        const response = await fetch(`${API_BASE_URL}/api/delete-user/${userId}`, {
            method: 'DELETE',
            headers: getAuthHeaders()
        })
        if (!response.ok) {
            const errorData = await response.json()
            throw new Error(errorData.message || 'Failed to delete user')
        }
        return response.json()
    },

    // Change Password
    changePassword: async (currentPassword, newPassword) => {
        const response = await fetch(`${API_BASE_URL}/api/admin/change-password`, {
            method: 'PUT',
            headers: getAuthHeaders(),
            body: JSON.stringify({ currentPassword, newPassword })
        })
        
        if (!response.ok) {
            const errorData = await response.json()
            throw new Error(errorData.message || 'Failed to change password')
        }
        
        return response.json()
    },

    // Health check
    healthCheck: async () => {
        const response = await fetch(`${API_BASE_URL}/api/admin/health`)
        
        if (!response.ok) {
            throw new Error('Health check failed')
        }
        
        return response.json()
    },

    // Generic API call with auth and ID support
    apiCall: async (endpoint, options = {}) => {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            headers: getAuthHeaders(),
            ...options
        })
        
        if (!response.ok) {
            throw new Error(`API call failed: ${response.statusText}`)
        }
        
        return response.json()
    },

    // Generic function to build URL with parameters
    buildUrl: (endpoint, params = {}) => {
        const url = new URL(`${API_BASE_URL}${endpoint}`)
        Object.keys(params).forEach(key => {
            if (params[key] !== undefined && params[key] !== null) {
                url.searchParams.append(key, params[key])
            }
        })
        return url.toString()
    }
}

export default apiService 