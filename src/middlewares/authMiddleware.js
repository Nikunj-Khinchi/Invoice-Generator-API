const jwt = require('jsonwebtoken');
const WriteResponse = require('../utils/response');
const logger = require('../utils/logger');

const authenticateUser = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', ''); 

    if (!token) {
        return WriteResponse(res, 401, 'Authorization token missing', null);
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        logger.error('Token verification failed');
        return WriteResponse(res, 401, 'Invalid or expired token', null);
    }
};


const authorizeRole = (roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return WriteResponse(res, 403, 'You do not have permission to access this resource', null);
        }
        next();
    };
};

module.exports = {
    authenticateUser,
    authorizeRole,
};
