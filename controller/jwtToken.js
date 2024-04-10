const jwt = require('jsonwebtoken');

// Create a JWT token
const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET_KEY, {expiresIn: "3d"});
}

module.exports = { generateToken } ;