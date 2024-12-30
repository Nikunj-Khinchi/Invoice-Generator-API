const mongoose = require('mongoose');

const invoiceSchema = new mongoose.Schema(
    {
        invoiceNumber: {
            type: String,
            required: true,
            unique: true,
        },
        customer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        invoiceDate: { type: Date, default: Date.now },
        dueDate: { type: Date, required: true },
        items: [
            {
                name: { type: String, required: true },
                quantity: { type: Number, required: true },
                unitPrice: { type: Number, required: true },
            },
        ],
        taxRate: {
            type: Number,
            required: true,
        },
        discount: {
            type: Number,
            default: 0,
        },
        totalAmount: { type: Number, required: true },
        paymentStatus: {
            type: String,
            enum: ['pending', 'paid', 'overdue'],
            default: 'pending',
        },
        isDeleted: {
            type: Boolean,
            default: false,
        },
        createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    },
    {
        timestamps: true, 
    }
);

const Invoice = mongoose.model('Invoice', invoiceSchema);

module.exports = Invoice;
