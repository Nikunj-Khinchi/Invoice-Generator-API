module.exports = {
    invoiceNumber: 'INV-12345',
    invoiceDate: new Date(),
    dueDate: new Date(new Date().setDate(new Date().getDate() + 30)),
    customer: {
        name: 'John Doe',
        address: '123 Main St, Anytown, USA',
        email: 'john.doe@example.com',
        phone: '555-555-5555',
    },
    items: [
        { name: 'Item 1', quantity: 2, unitPrice: 50.0 },
        { name: 'Item 2', quantity: 1, unitPrice: 100.0 },
        { name: 'Item 3', quantity: 5, unitPrice: 20.0 },
        { name: 'Item 1', quantity: 2, unitPrice: 50.0 },
        { name: 'Item 2', quantity: 1, unitPrice: 100.0 },
        { name: 'Item 3', quantity: 5, unitPrice: 20.0 },
        { name: 'Item 1', quantity: 2, unitPrice: 50.0 },
        { name: 'Item 2', quantity: 1, unitPrice: 100.0 },
        { name: 'Item 3', quantity: 5, unitPrice: 20.0 },
        { name: 'Item 1', quantity: 2, unitPrice: 50.0 },
        { name: 'Item 2', quantity: 1, unitPrice: 100.0 },
        { name: 'Item 3', quantity: 5, unitPrice: 20.0 },
        { name: 'Item 1', quantity: 2, unitPrice: 50.0 },
        { name: 'Item 2', quantity: 1, unitPrice: 100.0 },
        { name: 'Item 3', quantity: 5, unitPrice: 20.0 },
        { name: 'Item 1', quantity: 2, unitPrice: 50.0 },
        { name: 'Item 2', quantity: 1, unitPrice: 100.0 },
        { name: 'Item 3', quantity: 5, unitPrice: 20.0 },
        { name: 'Item 1', quantity: 2, unitPrice: 50.0 },
        { name: 'Item 2', quantity: 1, unitPrice: 100.0 },
        { name: 'Item 3', quantity: 5, unitPrice: 20.0 },
        { name: 'Item 1', quantity: 2, unitPrice: 50.0 },
        { name: 'Item 2', quantity: 1, unitPrice: 100.0 },
        { name: 'Item 3', quantity: 5, unitPrice: 20.0 },
        { name: 'Item 1', quantity: 2, unitPrice: 50.0 },
        { name: 'Item 2', quantity: 1, unitPrice: 100.0 },
        { name: 'Item 3', quantity: 5, unitPrice: 20.0 },
    ],
    taxRate: 10,
    discount: 5,
    totalAmount: 245.0,
    paymentStatus: 'Pending',
};