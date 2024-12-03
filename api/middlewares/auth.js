const jwt = require('jsonwebtoken');

const secretKey = process.env.JWT_SECRET;

const validateFor = (role) => (req, res, next) => {
    try {
        const decoded = decodeToken(req);
        console.log("decoded",decoded)
        if(decoded)
        if(role && role != decoded.role){ 
            return res.status(401).json({ message: 'unauthorized'}) 
        }

        req.data = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ message: err.message ||  'Unauthorized' });
    }
};

const decodeToken = (req) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new Error('unauthorized')
    }
    const token = authHeader.split(' ')[1];
    return jwt.verify(token, secretKey);
};

const validateUser = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, secretKey);
        req.data = decoded;
        next();
    } catch (err) {
        return res.status(403).json({ message: 'Forbidden' });
    }
};
module.exports = {validateUser, validateFor};