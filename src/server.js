const app = require('./app');
const config = require('./configs/envConfig');
const logger = require('./utils/logger');

// Start the server
const PORT = config.PORT;

app.listen(PORT, () => {
    logger.info(`Server is running on port ${PORT}`);
});
