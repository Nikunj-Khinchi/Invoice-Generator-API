const invoiceService = require('../services/invoiceService');
const WriteResponse = require('../utils/response');

const invoiceEmitter = require('../events/invoiceEmitterEvents');


const createInvoice = async (req, res) => {
    try {
        const { customerId, dueDate, items, taxRate, discount, paymentStatus } = req.body;
        
        const invoice = await invoiceService.createInvoice({ customerId, dueDate, items, taxRate, discount, paymentStatus, createdBy: req.user._id });

        // Emit an event to send mail and pdf to the customer
        invoiceEmitter.emit('invoiceCreated', invoice)

        return WriteResponse(res, 201, 'Invoice created successfully.', invoice);
    } catch (error) {
        return WriteResponse(res, error.statusCode || 500, error.message);
    }
};


const getAllInvoices = async (req, res) => {
    try {
        const invoices = await invoiceService.getAllInvoices(req.user);
        return WriteResponse(res, 200, 'Invoices retrieved successfully.', invoices);
    } catch (error) {
        return WriteResponse(res, error.statusCode || 500, error.message);
    }
};


const getInvoiceById = async (req, res) => {
    try {
        const { id } = req.params;
        const invoice = await invoiceService.getInvoiceById(id, req.user);
        return WriteResponse(res, 200, 'Invoice retrieved successfully.', invoice);
    } catch (error) {
        return WriteResponse(res, error.statusCode || 500, error.message);
    }
};


const updateInvoice = async (req, res) => {
    try {
        const { id } = req.params;
        const { dueDate, items, taxRate, discount, paymentStatus } = req.body;
        
        const updatedInvoice = await invoiceService.updateInvoice({ dueDate, items, taxRate, discount, paymentStatus, id, user: req.user});

        // Emit an event to send mail and pdf to the customer
        invoiceEmitter.emit('invoiceUpdated', updatedInvoice);

        return WriteResponse(res, 200, 'Invoice updated successfully.', updatedInvoice);
    } catch (error) {
        return WriteResponse(res, error.statusCode || 500, error.message);
    }
};


const deleteInvoice = async (req, res) => {
    try {
        const { id } = req.params;
        const invoice = await invoiceService.deleteInvoice(id, req.user);

        // Emit an event to send mail and pdf to the customer
        invoiceEmitter.emit('invoiceDeleted', invoice);

        return WriteResponse(res, 200, 'Invoice deleted successfully.', invoice);
    } catch (error) {
        return WriteResponse(res, error.statusCode || 500, error.message);
    }
};

module.exports = {
    createInvoice,
    getAllInvoices,
    getInvoiceById,
    updateInvoice,
    deleteInvoice,
};