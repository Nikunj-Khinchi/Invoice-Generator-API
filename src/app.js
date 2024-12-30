const config = require('./configs/envConfig');
const express = require('express');
const cors = require('cors');
const connectDB = require('./configs/db');
const { mongoose } = require('mongoose');
const logger = require('./utils/logger');
const {errorHandler} = require('./middlewares/errorHandlerMiddleware');
const requestLogger = require('./middlewares/requestLoggerMiddleware');
const routes = require("./routes/index")
const swaggerConfig = require('./configs/swaggerConfig');
const invoiceProcessor = require('./queues/invoiceProcessor'); // Ensure this is imported to register the event listeners

const app = express();


connectDB();


app.use(cors()); 
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 
app.use(requestLogger);

// Swagger setup
app.use('/api-docs', swaggerConfig.swaggerUi.serve, swaggerConfig.swaggerUi.setup(swaggerConfig.specs));


// Routes
app.get("/api/healthcheck", async (req, res) => {
    try {
        await mongoose.connection.db.admin().ping();
        res.status(200).json({
            message: {
                mongo: "Database is connected",
                server: "Server is running"
            }
        });
    } catch (error) {
        logger.error(`Error connecting to MongoDB: ${error.message}`);
        res.status(500).json({
            message: {
                mongo: "Database is not connected",
                server: "Server is running"
            }
        });
    }
});

app.use("/api", routes);


app.use(errorHandler);

module.exports = app;
