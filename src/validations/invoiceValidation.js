const Joi = require('joi');

const createInvoiceSchema = Joi.object({
    customerId: Joi.string().required().label('Customer Id'),
    dueDate: Joi.date().greater('now').required().label('Due Date'),
    items: Joi.array()
        .items(
            Joi.object({
                name: Joi.string().required(),
                quantity: Joi.number().min(1).required(),
                unitPrice: Joi.number().min(0).required(),
            })
        )
        .min(1)
        .required().label('Items List'),
    taxRate: Joi.number().min(0).max(100).required().label('Tax Rate'),
    discount: Joi.number().min(0).optional().label('Discount'),
    paymentStatus: Joi.string().valid('pending', 'paid', 'overdue').optional().label('Payment Status'),
});

const updateInvoiceSchema = Joi.object({
    customer: Joi.string().optional().label('Customer Id'),
    dueDate: Joi.date().greater('now').optional().label('Due Date'),
    items: Joi.array()
        .items(
            Joi.object({
                name: Joi.string().optional(),
                quantity: Joi.number().min(1).optional(),
                unitPrice: Joi.number().min(0).optional(),
                _id : Joi.string().required(),
            })
        )
        .optional().label('Items List'),
    taxRate: Joi.number().min(0).max(100).optional().label('Tax Rate'),
    discount: Joi.number().min(0).optional().label('Discount'),
    paymentStatus: Joi.string().valid('pending', 'paid', 'overdue').optional().label('Payment Status'),
}).min(1);

module.exports = { createInvoiceSchema, updateInvoiceSchema };