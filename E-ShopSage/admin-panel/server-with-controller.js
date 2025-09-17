const express = require('express');
const cors = require('cors');
const adminRoutes = require('./routes/adminRoutes');

const app = express();
const PORT = process.env.PORT || 8001;

// Middleware
app.use(cors());
app.use(express.json());

// Request logging middleware
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
    next();
});

// Routes
app.use('/api/admin', adminRoutes);

// Root endpoint
app.get('/', (req, res) => {
    res.json({
        message: 'E-ShopSage Admin API',
        version: '1.0.0',
        endpoints: {
            admin: '/api/admin',
            health: '/api/admin/health'
        }
    });
});

// 404 handler
app.use('*', (req, res) => {
    res.status(404).json({
        success: false,
        message: 'Route not found'
    });
});

// Error handling middleware
app.use((error, req, res, next) => {
    console.error('Server error:', error);
    res.status(500).json({
        success: false,
        message: 'Internal server error'
    });
});

app.listen(PORT, () => {
    console.log(`🚀 Admin API Server running on http://localhost:${PORT}`);
    console.log('\n📋 Available endpoints:');
    console.log('├── POST   /api/admin/login');
    console.log('├── POST   /api/admin/logout');
    console.log('├── GET    /api/admin/profile');
    console.log('├── PUT    /api/admin/profile');
    console.log('├── PUT    /api/admin/change-password');
    console.log('├── GET    /api/admin/all');
    console.log('└── GET    /api/admin/health');
    console.log('\n🔐 Test credentials: admin@example.com / admin123');
}); 