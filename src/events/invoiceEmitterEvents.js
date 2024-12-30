const EventEmitter = require('events');
const invoiceEmitter = new EventEmitter();

const invoiceQueue = require('../queues/invoiceQueue');
const logger = require('../utils/logger');


invoiceEmitter.on('invoiceCreated', (invoice) => {
    logger.info(`Event emitted: Invoice Created - ${invoice.invoiceNumber}`);
    invoiceQueue.add({ event: 'invoiceCreated', data: invoice });
});

invoiceEmitter.on('invoiceUpdated', (invoice) => {
    logger.info(`Event emitted: Invoice Updated - ${invoice.invoiceNumber}`);
    invoiceQueue.add({ event: 'invoiceUpdated', data: invoice });
});

invoiceEmitter.on('invoiceDeleted', (invoice) => {
    logger.info(`Event emitted: Invoice Deleted - ${invoice.invoiceNumber}`);
    invoiceQueue.add({ event: 'invoiceDeleted', data: invoice });
});

module.exports = invoiceEmitter;
