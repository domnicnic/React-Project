# Logout Functionality Guide

## Overview
The logout functionality has been implemented with both frontend and backend support, ensuring secure session termination.

## Backend Endpoints

### 1. `/api/logout` (General Logout)
- **Method**: POST
- **Headers**: Authorization: Bearer {token}
- **Response**: 
  ```json
  {
    "success": true,
    "message": "Logout successful"
  }
  ```

### 2. `/api/admin-logout` (Admin-specific Logout)
- **Method**: POST
- **Headers**: Authorization: Bearer {token}
- **Response**:
  ```json
  {
    "success": true,
    "message": "Admin logout successful"
  }
  ```

## Frontend Implementation

### Header Component (`src/components/Layout/Header.jsx`)
The logout function in the Header component:

1. **Shows loading state** with spinner icon
2. **Calls the logout API** via `apiService.logout()`
3. **Clears local state** via `logout()` from AuthContext
4. **Navigates to login page** via `navigate('/login')`
5. **Handles errors gracefully** - continues with local logout even if API fails

### AuthContext (`src/context/AuthContext.jsx`)
The logout function in AuthContext:

1. **Calls the logout API** to invalidate server-side session
2. **Clears localStorage** by removing the token
3. **Resets user state** to null
4. **Sets authentication to false**

### API Service (`src/services/api.js`)
Centralized API calls with:

- **Automatic token handling** in headers
- **Error handling** for network issues
- **Consistent response format**

## Usage

### Starting the Backend Server
```bash
node server.js
```

### Testing the Logout
1. Login with credentials: `admin@example.com` / `admin123`
2. Navigate to dashboard
3. Click the user icon in the header
4. Click "Logout" button
5. Verify you're redirected to login page

## Error Handling

The logout function is designed to be **resilient**:
- If the API call fails, it still clears local state
- If the server is down, logout still works locally
- User is always redirected to login page

## Security Features

1. **Token-based authentication** for API calls
2. **Server-side session invalidation** (when API is available)
3. **Local storage cleanup** to remove sensitive data
4. **State reset** to prevent unauthorized access

## Customization

To customize the logout behavior:

1. **Change API endpoint**: Modify `API_BASE_URL` in `src/services/api.js`
2. **Add custom logic**: Extend the logout function in `AuthContext.jsx`
3. **Modify UI**: Update the Header component styling
4. **Add notifications**: Integrate with a toast notification system 