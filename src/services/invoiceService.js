const Invoice = require('../models/invoiceModel');
const crypto = require('crypto');
const logger = require('../utils/logger');
const User = require('../models/userModel');

const calculateTotalAmount = (items, taxRate, discount) => {
    const itemsTotal = items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);
    const tax = (taxRate / 100) * itemsTotal;
    const totalAmount = itemsTotal + tax - (discount || 0);
    return totalAmount;
};
z
const generateInvoiceNumber = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const uniqueId = crypto.randomBytes(3).toString('hex').toUpperCase();

    return `INV-${year}${month}${day}-${uniqueId}`; // Example: INV-20231228-1A2B3C
};


const createInvoice = async ({ customerId, dueDate, items, taxRate, discount, paymentStatus, createdBy }) => {
    try {
    
        const customer = await User.findById({_id : customerId});
        if (!customer) {
            throw { message: 'Customer not found', statusCode: 404 };
        }

        const totalAmount = calculateTotalAmount(items, taxRate, discount);

        const invoice = new Invoice({
            invoiceNumber: generateInvoiceNumber(),
            customer : customerId,
            dueDate,
            items,
            taxRate,
            discount,
            totalAmount,
            paymentStatus,
            createdBy,
        })

        await invoice.save();
        const populatedInvoice = await invoice.populate('customer', 'id username address email phone');
        logger.info(`Invoice created: ${invoice.invoiceNumber}`);
        return populatedInvoice;
    } catch (error) {
        logger.error(`Error creating invoice: ${error.message}`);
        throw { message: 'Error creating invoice', statusCode: 500 };
    }
};


const getAllInvoices = async (user) => {
    try {
        const filter = user.role === 'admin' ? { isDeleted: false } : { customer: user._id, isDeleted: false };
        const invoices = await Invoice.find(filter).populate('customer', 'id username address email phone');
        logger.info(`Retrieved ${invoices.length} invoices`);
        return invoices;
    } catch (error) {
        logger.error(`Error retrieving invoices: ${error.message}`);
        throw { message: 'Error retrieving invoices', statusCode: 500 };
    }
};

const getInvoiceById = async (id, user) => {
    try {
        const invoice = await Invoice.findById({
            _id: id,
            isDeleted: false,
        });
        if (!invoice) throw { message: 'Invoice not found', statusCode: 404 };
        if (user.role !== 'admin' && invoice.customer.toString() !== user._id.toString()) {
            throw { message: 'Unauthorized to view this invoice', statusCode: 403 };
        }
        logger.info(`Retrieved invoice: ${invoice.invoiceNumber}`);
        return invoice;
    } catch (error) {
        logger.error(`Error retrieving invoice: ${error.message}`);
        throw { message: error.message || 'Error retrieving invoice', statusCode: error.statusCode || 500 };
    }
};


const updateInvoice = async ({ dueDate, items, taxRate, discount, paymentStatus, id, user }) => {
    try {

        const invoice = await Invoice.findById({
            _id: id,
            isDeleted: false,
        });
        if (!invoice) throw { message: 'Invoice not found', statusCode: 404 };
        
        if (invoice.createdBy.toString() !== user._id.toString()) {
            throw { message: 'Unauthorized to update this invoice', statusCode: 403 };
        }
  
        const updateFields = {};
        if (dueDate) updateFields['dueDate'] = dueDate;
        if (taxRate) updateFields['taxRate'] = taxRate;
        if (discount) updateFields['discount'] = discount;
        if (paymentStatus) updateFields['paymentStatus'] = paymentStatus;

        const updatedInvoice = await Invoice.findByIdAndUpdate(
            id,
            { $set: updateFields },
            { new: true, runValidators: true }
        );


        if (items && items.length > 0) {
            const bulkOperations = await Promise.all(items.map(async item => {
                if (!item._id) {
                    throw { message: 'Item ID is required to update an item', statusCode: 400 };
                }

                
                const invoice = await Invoice.findOne({ _id: id, 'items._id': item._id });
                if (!invoice) {
                    throw { message: `Item with ID ${item._id} not found in invoice`, statusCode: 404 };
                }

                return {
                    updateOne: {
                        filter: { _id: id, 'items._id': item._id },
                        update: {
                            $set: {
                                'items.$.name': item.name,
                                'items.$.quantity': item.quantity,
                                'items.$.unitPrice': item.unitPrice,
                            },
                        },
                        runValidators: true
                    }
                };
            }));
            await Invoice.bulkWrite(bulkOperations);
        }

        
        const finalUpdatedInvoice = await Invoice.findById(id).populate('customer', 'id username address email phone');

        logger.info(`Invoice updated: ${finalUpdatedInvoice.invoiceNumber}`);
        return finalUpdatedInvoice;
    } catch (error) {
        logger.error(`Error updating invoice: ${error.message}`);
        throw { message: error.message || 'Error updating invoice', statusCode: error.statusCode || 500 };
    }
};

const deleteInvoice = async (id, user) => {
    try {
        const invoice = await Invoice.findOne({
            _id: id,
            isDeleted: false,
        }).populate('customer', 'id username address email phone');
        if (!invoice) throw { message: 'Invoice not found', statusCode: 404 };
        
        if (invoice.createdBy.toString() !== user._id.toString()) {
            throw { message: 'Unauthorized to delete this invoice', statusCode: 403 };
        }

        invoice.isDeleted = true;
        await invoice.save();
        logger.info(`Invoice marked as deleted: ${invoice.invoiceNumber}`);
        return invoice;
    } catch (error) {
        logger.error(`Error deleting invoice: ${error.message}`);
        throw { message: error.message || 'Error deleting invoice', statusCode: error.statusCode || 500 };
    }
};


module.exports = {
    createInvoice,
    getAllInvoices,
    getInvoiceById,
    updateInvoice,
    deleteInvoice,
};
