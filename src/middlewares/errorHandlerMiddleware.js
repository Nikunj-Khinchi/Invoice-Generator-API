
const logger = require('../utils/logger');
const WriteResponse = require('../utils/response');


const errorHandler = (err, req, res, next) => {
    let statusCode = err.statusCode || 500; 
    let message = err.message || 'Internal Server Error';

    logger.error(`${req.method} ${req.url} - ${message}`);

    return WriteResponse(res, 500, 'Something went wrong. Please try again later.', null);
};

module.exports = { errorHandler };
