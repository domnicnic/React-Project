# AdminController.js Implementation Guide

## 🏗️ **Architecture Overview**

The `adminController.js` implements a complete admin authentication system using Node.js with Express, following the MVC (Model-View-Controller) pattern.

## 📁 **File Structure**

```
controllers/
├── adminController.js          # Main controller logic
routes/
├── adminRoutes.js             # Route definitions
server-with-controller.js      # Express server setup
backend-package.json           # Backend dependencies
```

## 🔧 **Key Features**

### **1. Authentication System**
- **JWT Token Generation**: Secure token-based authentication
- **Password Hashing**: bcrypt for secure password storage
- **Token Blacklisting**: Prevents reuse of logged-out tokens
- **Role-based Access**: Support for different admin roles

### **2. Security Features**
- **Input Validation**: All inputs are validated
- **Error Handling**: Comprehensive error handling
- **Token Verification**: Middleware for protected routes
- **Password Security**: bcrypt hashing with salt

### **3. API Endpoints**

#### **Public Routes (No Auth Required)**
```javascript
POST   /api/admin/login      // Admin login
GET    /api/admin/health     // Health check
```

#### **Protected Routes (Auth Required)**
```javascript
POST   /api/admin/logout           // Admin logout
GET    /api/admin/profile          // Get admin profile
PUT    /api/admin/profile          // Update admin profile
PUT    /api/admin/change-password  // Change password
GET    /api/admin/all              // Get all admins (super admin only)
```

## 🚀 **How Logout Works in adminController.js**

### **1. Logout Method Implementation**

```javascript
async logout(req, res) {
    try {
        // Step 1: Extract token from headers
        const token = req.headers.authorization?.replace('Bearer ', '');

        if (!token) {
            return res.status(400).json({
                success: false,
                message: 'Token is required'
            });
        }

        // Step 2: Verify token validity
        let decoded;
        try {
            decoded = jwt.verify(token, JWT_SECRET);
        } catch (error) {
            return res.status(401).json({
                success: false,
                message: 'Invalid token'
            });
        }

        // Step 3: Add token to blacklist
        blacklistedTokens.add(token);

        // Step 4: Log the logout action
        console.log(`Admin logout: ${decoded.email}`);

        // Step 5: Send success response
        res.json({
            success: true,
            message: 'Logout successful'
        });

    } catch (error) {
        console.error('Admin logout error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
}
```

### **2. Token Verification Middleware**

```javascript
verifyToken(req, res, next) {
    try {
        const token = req.headers.authorization?.replace('Bearer ', '');

        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Access token required'
            });
        }

        // Check if token is blacklisted
        if (blacklistedTokens.has(token)) {
            return res.status(401).json({
                success: false,
                message: 'Token has been invalidated'
            });
        }

        // Verify token
        const decoded = jwt.verify(token, JWT_SECRET);
        
        // Add user info to request
        req.admin = decoded;
        next();

    } catch (error) {
        console.error('Token verification error:', error);
        res.status(401).json({
            success: false,
            message: 'Invalid token'
        });
    }
}
```

## 🔄 **Complete Logout Flow**

### **Frontend → Backend Flow:**

1. **User clicks logout** in Header component
2. **Frontend calls** `apiService.logout()`
3. **API request** sent to `/api/admin/logout`
4. **Backend receives** request with Bearer token
5. **Controller validates** token
6. **Token blacklisted** to prevent reuse
7. **Success response** sent back
8. **Frontend clears** local state
9. **User redirected** to login page

### **Security Measures:**

- ✅ **Token Validation**: Verifies JWT signature
- ✅ **Token Blacklisting**: Prevents token reuse
- ✅ **Error Handling**: Graceful error responses
- ✅ **Logging**: Tracks logout activities
- ✅ **Input Validation**: Validates required fields

## 🛠️ **Setup Instructions**

### **1. Install Dependencies**
```bash
npm install express cors jsonwebtoken bcryptjs
npm install --save-dev nodemon
```

### **2. Start the Server**
```bash
# Development mode
npm run dev

# Production mode
npm start
```

### **3. Test the API**
```bash
# Health check
curl http://localhost:8001/api/admin/health

# Login
curl -X POST http://localhost:8001/api/admin/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","password":"admin123"}'

# Logout (with token)
curl -X POST http://localhost:8001/api/admin/logout \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

## 📊 **Database Integration**

### **Current Implementation:**
- Uses in-memory array for demo
- Sample admin user with hashed password

### **Production Implementation:**
```javascript
// Replace with database queries
const admin = await Admin.findOne({ email });
await Admin.updateOne({ id }, { lastLogin: new Date() });
await BlacklistedToken.create({ token });
```

## 🔐 **Environment Variables**

Create `.env` file:
```env
JWT_SECRET=your-super-secret-jwt-key
PORT=8001
NODE_ENV=development
```

## 🧪 **Testing**

### **Manual Testing:**
1. Start server: `npm run dev`
2. Login with: `admin@example.com` / `admin123`
3. Copy JWT token from response
4. Test logout with token
5. Verify token is blacklisted

### **API Testing Tools:**
- **Postman**: Import the endpoints
- **Insomnia**: Test the API flow
- **curl**: Command line testing

## 🚨 **Error Handling**

The controller handles various error scenarios:

- **400**: Missing required fields
- **401**: Invalid/missing token
- **403**: Insufficient permissions
- **404**: Resource not found
- **500**: Internal server error

## 🔄 **Frontend Integration**

Update your frontend API service to use the new endpoints:

```javascript
// Login
const response = await fetch('/api/admin/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
});

// Logout
const response = await fetch('/api/admin/logout', {
    method: 'POST',
    headers: { 
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
    }
});
```

## 📈 **Performance Considerations**

- **Token Blacklisting**: Use Redis for production
- **Database Queries**: Implement caching
- **Rate Limiting**: Add rate limiting middleware
- **Logging**: Use proper logging library
- **Monitoring**: Add health checks and metrics

This implementation provides a robust, secure, and scalable admin authentication system! 🚀 