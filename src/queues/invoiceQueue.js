const Queue = require('bull');
const config = require('../configs/envConfig');
const redisConfig = { host: config.REDIS_HOST, port: config.REDIS_PORT };

const invoiceQueue = new Queue('invoiceQueue', {
    redis: redisConfig,
    defaultJobOptions: {
        attempts: 3, 
        backoff: {
            type: 'exponential',
            delay: 5000,
        },
        removeOnComplete: true,
        removeOnFail: false, 
    },

});

module.exports = invoiceQueue;
