const validator = require('validator');
const { check, validationResult } = require('express-validator');
const adminAuthValidation = (req, res) => {
    return [
        check('email')
            .custom((value, { req }) => {
                if (!value) {
                    throw new Error('Please enter email address');
                } else if (!validator.isEmail(value)) {
                    throw new Error('Invalid email format');
                }
                return true;
            }),
        check('password', 'Please enter password').not().isEmpty(),
    ];
};

module.exports = {
    adminAuthValidation
}