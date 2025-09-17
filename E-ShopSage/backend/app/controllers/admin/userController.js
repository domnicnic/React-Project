const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const sql = require('../../config/db');
exports.usersList = async (req, res) => {
    try {
        const [result] = await sql.promise().query(
            'SELECT * FROM users where id != 1 and status = 1',
        );
        return res.status(200).json({
            success: true,
            message: 'Users fetched successfully',
            data: result
        });
    } catch (error) {
        console.error('User Error:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
}
exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.params.id;
        const [result] = await sql.promise().query(
            'DELETE FROM users WHERE id = ?',
            [id]
        );
        return res.status(200).json({
            success: true,
            message: 'User deleted successfully',
            data: result
        });
    } catch (error) {
        console.error('User Error:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
}
exports.viewUser = async (req, res) => {
    try {
        const user_id = req.params.id || req.query.id;
        const [result] = await sql.promise().query(
            "SELECT id, name, email, type, status, created_at, updated_at, last_login FROM users WHERE id = ? AND type = '1'", 
            [user_id]
        );
        const user = result[0];
        return res.status(200).json({
            success: true,
            message: 'User fetched successfully',
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
        console.error('User Error:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
}