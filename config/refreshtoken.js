const jwt = require('jsonwebtoken');

// Create a JWT token
const generateRefreshToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET_KEY, {expiresIn: "3d"});
}

module.exports = { generateRefreshToken } ;