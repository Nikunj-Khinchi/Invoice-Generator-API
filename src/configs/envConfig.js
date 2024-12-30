require('dotenv').config();

const config = {
    PORT: process.env.PORT || 3000,
    MONGO_URI: process.env.MONGO_URI || 'mongodb//localhost:27017/invoice-app',
    JWT_SECRET: process.env.JWT_SECRET || 'your_jwt_secret',
    JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '1d',
    REDIS_HOST : process.env.REDIS_HOST || '127.0.0.1',
    REDIS_PORT : process.env.REDIS_PORT || 6379,
    EMAIL_USER: process.env.EMAIL_USER,
    EMAIL_PASSWORD: process.env.EMAIL_PASSWORD,

};

module.exports = config;

