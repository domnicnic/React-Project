const jwt = require('jsonwebtoken');

const adminAuthenticateOld = (req, res, next) => {
    console.log("session-", req.headers);
    if (req.session && req.session.authToken) {
        const token = req.session.authToken;
        if (!token) {
            req.flash('error', 'No token provided');
            return res.redirect('/admin/login');
        }
        // Verify the token
        jwt.verify(token, process.env.ADMIN_APP_KEY, (err, decoded) => {
            if (err) {
                req.flash('error', 'Failed to authenticate token');
                return res.redirect('/admin/login');
            }
            req.user = decoded;
            next();
        });
    } else {
        req.flash('error', 'You are not authorized to access this page.');
        res.redirect('/admin/login');
    }
};


const adminAuthenticateOld2 = (req, res, next) => {
    console.log("session-", req.headers);
    if (req.session && req.session.authToken) {
        const token = req.session.authToken;
        if (!token) {
            req.flash('error', 'No token provided');
            return res.redirect('/admin/login');
        }
        // Verify the token
        jwt.verify(token, process.env.ADMIN_APP_KEY, (err, decoded) => {
            if (err) {
                req.flash('error', 'Failed to authenticate token');
                return res.redirect('/admin/login');
            }
            req.user = decoded;
            next();
        });
    } else {
        req.flash('error', 'You are not authorized to access this page.');
        res.redirect('/admin/login');
    }
};

// API-friendly admin authentication middleware
const adminAuthenticate = (req, res, next) => {
    try {
        // Check if cookies exist
        if (!req.headers.cookie) {
            return res.status(401).json({
                success: false,
                message: 'Authentication token not found'
            });
        }

        // Extract authToken from cookies
        const authTokenCookie = req.headers.cookie
            .split(';')
            .find(cookie => cookie.trim().startsWith('authToken='));
        
        if (!authTokenCookie) {
            return res.status(401).json({
                success: false,
                message: 'Authentication token not found in cookies'
            });
        }

        const token = authTokenCookie.split('=')[1];
        
        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Invalid authentication token'
            });
        }

        // Verify the JWT token
        jwt.verify(token, process.env.ADMIN_APP_KEY, (err, decoded) => {
            if (err) {
                console.error('JWT verification error:', err.message);
                return res.status(401).json({
                    success: false,
                    message: 'Invalid or expired authentication token'
                });
            }
            
            // Set user data on request object
            req.user = decoded;
            next();
        });
        
    } catch (error) {
        console.error('Admin authentication error:', error);
        return res.status(500).json({
            success: false,
            message: 'Authentication error occurred'
        });
    }
};

// Alternative: Bearer token authentication (for API clients)
const adminAuthenticateBearer = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({
                success: false,
                message: 'Authorization header with Bearer token required'
            });
        }

        const token = authHeader.substring(7); // Remove 'Bearer ' prefix
        
        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Invalid authentication token'
            });
        }

        // Verify the JWT token
        jwt.verify(token, process.env.ADMIN_APP_KEY, (err, decoded) => {
            if (err) {
                console.error('JWT verification error:', err.message);
                return res.status(401).json({
                    success: false,
                    message: 'Invalid or expired authentication token'
                });
            }
            
            // Set user data on request object
            req.user = decoded;
            next();
        });
        
    } catch (error) {
        console.error('Admin authentication error:', error);
        return res.status(500).json({
            success: false,
            message: 'Authentication error occurred'
        });
    }
};

// Flexible authentication middleware - supports both cookies and Bearer tokens
const adminAuthenticateFlexible = (req, res, next) => {
    try {
        let token = null;
        
        // First, try to get token from Authorization header (Bearer token)
        const authHeader = req.headers.authorization;
        if (authHeader && authHeader.startsWith('Bearer ')) {
            token = authHeader.substring(7);
        }
        
        // If no Bearer token, try to get from cookies
        if (!token && req.headers.cookie) {
            const authTokenCookie = req.headers.cookie
                .split(';')
                .find(cookie => cookie.trim().startsWith('authToken='));
            
            if (authTokenCookie) {
                token = authTokenCookie.split('=')[1];
            }
        }
        
        // If still no token found
        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Authentication token not found. Please provide Bearer token in Authorization header or authToken cookie.'
            });
        }

        // Verify the JWT token
        jwt.verify(token, process.env.ADMIN_APP_KEY, (err, decoded) => {
            if (err) {
                console.error('JWT verification error:', err.message);
                return res.status(401).json({
                    success: false,
                    message: 'Invalid or expired authentication token'
                });
            }
            
            // Set user data on request object
            req.user = decoded;
            next();
        });
        
    } catch (error) {
        console.error('Admin authentication error:', error);
        return res.status(500).json({
            success: false,
            message: 'Authentication error occurred'
        });
    }
};

module.exports = { adminAuthenticate, adminAuthenticateBearer, adminAuthenticateFlexible };