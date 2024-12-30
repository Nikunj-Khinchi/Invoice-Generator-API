const invoiceQueue = require('./invoiceQueue');
const logger = require('../utils/logger');
const pdfService = require('../utils/pdfGenerator');
const emailService = require('../utils/emailService');
const { generateEmailTemplate } = require('../utils/templates');

invoiceQueue.process(async (job) => {
    const { event, data } = job.data;

    try {
        switch (event) {
            case 'invoiceCreated':
                logger.info(`Processing invoiceCreated event for Invoice: ${data.invoiceNumber}`);

                const createdPdfPath = await pdfService.generatePDFBuffer(data);
                const htmlContent = generateEmailTemplate(data);
                const createdCustomerEmail = data.customer.email;
                const createdAttachments = [{
                    filename: `${data.invoiceNumber}.pdf`,
                    content: createdPdfPath,
                    contentType: 'application/pdf'
                }];

                await emailService.sendEmail({
                    to: createdCustomerEmail,
                    subject: `Invoice ${data.invoiceNumber}`,
                    text: `Dear ${data.customer.name},\n\nPlease find attached your invoice ${data.invoiceNumber}.\n\nThank you.`,
                    html: htmlContent, attachments: createdAttachments,
                });

                logger.info(`Emails sent to customer ${createdCustomerEmail}`);
                break;

            case 'invoiceUpdated':
                logger.info(`Processing invoiceUpdated event for Invoice: ${data.invoiceNumber}`);

                const updatedPdfPath = await pdfService.generatePDFBuffer(data);
                const updatedhtmlContent = generateEmailTemplate(data);
                const updatedCustomerEmail = data.customer.email;
                const updatedAttachments = [{
                    filename: `${data.invoiceNumber}.pdf`,
                    content: updatedPdfPath,
                    contentType: 'application/pdf'
                }];

                await emailService.sendEmail({
                    to: updatedCustomerEmail,
                    subject: `Invoice Updated: ${data.invoiceNumber}`,
                    text: `Dear ${data.customer.name},\n\nPlease find attached your updated invoice ${data.invoiceNumber}.\n\nThank you.`,
                    html: updatedhtmlContent,
                    attachments: updatedAttachments,
                });

                logger.info(`Emails sent to customer ${updatedCustomerEmail}`);
                break;

            case 'invoiceDeleted':
                logger.info(`Processing invoiceDeleted event for Invoice: ${data.invoiceNumber}`);

                const deletedCustomerEmail = data.customer.email;

                await emailService.sendEmail({
                    to: deletedCustomerEmail,
                    subject: `Invoice Deleted: ${data.invoiceNumber}`,
                    text: `Dear ${data.customer.username}, your invoice has been deleted.`,
                });

                logger.info(`Emails sent to customer ${deletedCustomerEmail}`);
                break;

            default:
                logger.warn(`Unhandled event: ${event}`);
        }
    } catch (error) {
        logger.error(`Error processing ${event}: ${error.message}`);
        throw error;
    }
});
