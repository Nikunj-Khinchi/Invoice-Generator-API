const nodemailer = require('nodemailer');
const logger = require('./logger');
const config = require('../configs/envConfig');
require('dotenv').config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: config.EMAIL_USER,
        pass: config.EMAIL_PASSWORD,
    },
});

const sendEmail = async ({ to, subject, text, html, attachments }) => {
    try {
        await transporter.sendMail({
            from: config.EMAIL_USER,
            to,
            subject,
            text,
            html,
            attachments,
        });
    } catch (error) {
        logger.error('Error sending email:', error);
        throw error;
    }
};

module.exports = { sendEmail };