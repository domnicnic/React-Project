const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const sql = require('../../config/db');

exports.adminLoginAction = async (req, res) => {
    try {
        console.log('=== Admin Login Request ===');
        console.log('Request body:', req.body);
        // Validate input
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Email and password are required'
            });
        }
        // Find user in database
        const [result] = await sql.promise().query(
            "SELECT * FROM users WHERE type='1' AND email = ?", 
            [email]
        );
        
        if (!result || result.length === 0) {
            return res.status(401).json({
                success: false,
                message: 'Invalid email or password'
            });
        }
        const user = result[0];
        // Verify password
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({
                success: false,
                message: 'Invalid email or password'
            });
        }

        // Check if account is active
        if (user.status === "0") {
            return res.status(403).json({
                success: false,
                message: 'Your account is inactive. Please contact administrator.'
            });
        }
        // Generate JWT token
        const token = jwt.sign({ 
            userId: user.id, 
            userType: user.type, 
            loginUserDetails: user 
        }, process.env.ADMIN_APP_KEY, { 
            expiresIn: '1d' 
        });
        // Update last login
        await sql.promise().query(
            "UPDATE users SET last_login = NOW() WHERE id = ?", 
            [user.id]
        );
        console.log('Login successful for user:', user.email);
        // Set cookie
        res.cookie('authToken', token, { 
            maxAge: 24 * 60 * 60 * 1000, // 1 day
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict'
        });

        // Return success response for React
        return res.status(200).json({
            success: true,
            message: 'Login successful',
            data: {
                user: {
                    id: user.id,
                    email: user.email,
                    name: user.name || '',
                    type: user.type,
                    status: user.status
                },
                token: token
            }
        });
    } catch (error) {
        console.error('Login Error:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};

exports.adminLogout = async (req, res) => {
    try {
        console.log('=== Admin Logout Request ===');
        
        // Get user info from token if available
        let userId = null;
        const token = req.cookies?.authToken || req.headers.authorization?.replace('Bearer ', '');
        
        if (token) {
            try {
                // FIXED: Use correct environment variable name
                const decoded = jwt.verify(token, process.env.ADMIN_APP_KEY);
                userId = decoded.userId;
                console.log('Logging out user ID:', userId);
            } catch (jwtError) {
                console.log('Invalid token during logout:', jwtError.message);
            }
        }

        // Clear all possible auth cookies
        res.clearCookie('authToken', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict'
        });
        
        res.clearCookie('authToken', {
            httpOnly: false,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict'
        });

        // Optional: Update last logout in database
        if (userId) {
            try {
                await sql.promise().query(
                    "UPDATE users SET last_logout = NOW() WHERE id = ?",
                    [userId]
                );
                console.log('Updated last logout for user:', userId);
            } catch (dbError) {
                console.warn('Failed to update last logout:', dbError.message);
                // Don't fail logout for database error
            }
        }

        console.log('Logout successful');

        // Return success response for React
        return res.status(200).json({
            success: true,
            message: 'Logout successful',
            data: {
                timestamp: new Date().toISOString(),
                userId: userId
            }
        });

    } catch (error) {
        console.error('Logout Error:', error);
        
        // Still clear cookies even if there's an error
        res.clearCookie('authToken');
        
        return res.status(500).json({
            success: false,
            message: 'Logout failed',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

exports.adminProfile = async (req, res) => {
    try {
        const user_id = req.params.id || req.query.id;
        if (!user_id) {
            return res.status(400).json({
                success: false,
                message: 'User ID is required'
            });
        }
        // Get token from headers or cookies
        const token = req.headers.authorization?.replace('Bearer ', '') || req.cookies?.authToken;
        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Authentication token is required'
            });
        }
        // Verify token
        let decoded;
        try {
            decoded = jwt.verify(token, process.env.ADMIN_APP_KEY);
        } catch (jwtError) {
            return res.status(401).json({
                success: false,
                message: 'Invalid or expired token'
            });
        }
        
        // Get user profile from database
        const [result] = await sql.promise().query(
            "SELECT id, name, email, type, status, created_at, updated_at, last_login FROM users WHERE id = ? AND type = '1'", 
            [user_id]
        );
        if (!result || result.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Admin user not found'
            });
        }
        const user = result[0];
        // Return success response for React
        return res.status(200).json({
            success: true,
            message: 'Profile fetched successfully',
            data: {
                user: {
                    id: user.id,
                    email: user.email,
                    name: user.name || '',
                    type: user.type,
                    status: user.status,
                    created_at: user.created_at,
                    updated_at: user.updated_at,
                    last_login: user.last_login
                }
            }
        });

    } catch (error) {
        console.error('Profile Error:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};