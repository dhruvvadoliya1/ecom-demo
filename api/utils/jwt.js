const jwt = require('jsonwebtoken');

function generateJWT(user) {
    return jwt.sign({ id: user.id, email: user.email, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });
}

function verifyJWT(token) {
    return jwt.verify(token, process.env.JWT_SECRET);
}

module.exports = { generateJWT, verifyJWT };