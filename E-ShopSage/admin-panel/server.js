import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 8001;

// Middleware
app.use(cors());
app.use(express.json());

// Sample user data
const users = [
    {
        id: 1,
        email: 'admin@example.com',
        password: 'admin123',
        name: 'Admin User',
        role: 'Administrator',
        userType: 'admin',
        profileImage: null
    },
    {
        id: 2,
        email: 'john.doe@example.com',
        password: 'password123',
        name: 'John Doe',
        role: 'Manager',
        userType: 'manager',
        profileImage: null
    },
    {
        id: 3,
        email: 'jane.smith@example.com',
        password: 'password123',
        name: 'Jane Smith',
        role: 'User',
        userType: 'user',
        profileImage: null
    },
    {
        id: 4,
        email: 'mike.wilson@example.com',
        password: 'password123',
        name: 'Mike Wilson',
        role: 'User',
        userType: 'user',
        profileImage: null
    },
    {
        id: 5,
        email: 'sarah.johnson@example.com',
        password: 'password123',
        name: 'Sarah Johnson',
        role: 'Manager',
        userType: 'manager',
        profileImage: null
    }
];

// Login endpoint (alias for admin-action)
app.post('/api/admin-action', (req, res) => {
    const { email, password } = req.body;
    
    console.log('Admin login attempt:', { email, password });
    
    // Find user
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
        res.json({
            success: true,
            message: 'Login successful',
            token: 'sample-jwt-token-here',
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.role,
                userType: user.userType
            }
        });
    } else {
        res.status(401).json({
            success: false,
            message: 'Invalid email or password'
        });
    }
});

// Login endpoint (original)
app.post('/api/login-action', (req, res) => {
    const { email, password } = req.body;
    
    console.log('Login attempt:', { email, password });
    
    // Find user
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
        res.json({
            success: true,
            message: 'Login successful',
            token: 'sample-jwt-token-here',
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.role,
                userType: user.userType
            }
        });
    } else {
        res.status(401).json({
            success: false,
            message: 'Invalid email or password'
        });
    }
});

// Logout endpoint
app.post('/api/logout', (req, res) => {
    try {
        // In a real application, you would:
        // 1. Verify the token
        // 2. Add it to a blacklist
        // 3. Clear any server-side sessions
        
        console.log('Logout request received');
        
        res.json({
            success: true,
            message: 'Logout successful'
        });
    } catch (error) {
        console.error('Logout error:', error);
        res.status(500).json({
            success: false,
            message: 'Logout failed'
        });
    }
});

// Admin logout endpoint
app.post('/api/admin-logout', (req, res) => {
    try {
        // In a real application, you would:
        // 1. Verify the admin token
        // 2. Add it to a blacklist
        // 3. Clear any server-side admin sessions
        
        console.log('Admin logout request received');
        
        res.json({
            success: true,
            message: 'Admin logout successful'
        });
    } catch (error) {
        console.error('Admin logout error:', error);
        res.status(500).json({
            success: false,
            message: 'Admin logout failed'
        });
    }
});

// Admin profile endpoint
app.get('/api/admin-profile', (req, res) => {
    try {
        const { id } = req.query;
        console.log('Admin profile request for ID:', id);
        
        // Find user by ID
        const user = users.find(u => u.id == id);
        
        if (user) {
            res.json({
                success: true,
                data: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    userType: user.userType,
                    avatar: user.profileImage
                }
            });
        } else {
            res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }
    } catch (error) {
        console.error('Admin profile error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to get admin profile'
        });
    }
});

// Get users endpoint
app.get('/api/users', (req, res) => {
    try {
        console.log('Get users request received');
        
        res.json({
            success: true,
            data: users.map(user => ({
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                userType: user.userType
            }))
        });
    } catch (error) {
        console.error('Get users error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to get users'
        });
    }
});

// View user details endpoint
app.get('/api/view-user/:id', (req, res) => {
    try {
        const userId = parseInt(req.params.id);
        console.log('View user request for ID:', userId);
        
        // Find user by ID
        const user = users.find(u => u.id === userId);
        
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }
        
        // Return detailed user information
        res.json({
            success: true,
            data: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                userType: user.userType,
                profileImage: user.profileImage,
                createdAt: new Date().toISOString(), // Mock creation date
                lastLogin: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(), // Mock last login
                status: 'Active',
                phone: '+1 (555) 123-4567', // Mock phone
                address: '123 Main St, City, State 12345', // Mock address
                department: 'IT Department', // Mock department
                permissions: ['read', 'write', 'delete'], // Mock permissions
                totalLogins: Math.floor(Math.random() * 100) + 10, // Mock login count
                accountType: user.userType === 'admin' ? 'Administrator' : 'Standard User'
            }
        });
    } catch (error) {
        console.error('View user error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to get user details'
        });
    }
});

// Delete user endpoint
app.delete('/api/users/:id', (req, res) => {
    try {
        const userId = parseInt(req.params.id);
        console.log('Delete user request for ID:', userId);
        
        // Find user index
        const userIndex = users.findIndex(u => u.id === userId);
        
        if (userIndex === -1) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }
        
        // Remove user from array
        const deletedUser = users.splice(userIndex, 1)[0];
        
        res.json({
            success: true,
            message: 'User deleted successfully',
            data: {
                id: deletedUser.id,
                name: deletedUser.name,
                email: deletedUser.email
            }
        });
    } catch (error) {
        console.error('Delete user error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to delete user'
        });
    }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', message: 'Backend server is running' });
});

app.listen(PORT, () => {
    console.log(`Backend server running on http://localhost:${PORT}`);
    console.log('Available endpoints:');
    console.log('- POST /api/login-action');
    console.log('- POST /api/admin-action');
    console.log('- POST /api/logout');
    console.log('- POST /api/admin-logout');
    console.log('- GET /api/admin-profile');
    console.log('- GET /api/users');
    console.log('- GET /api/view-user/:id');
    console.log('- DELETE /api/users/:id');
    console.log('- GET /api/health');
}); 