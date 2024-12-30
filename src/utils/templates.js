const generatPDFTemplate = (invoice) => {
    return `
        <html>
        <head>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    color: #333;
                    margin: 0;
                    padding: 0;
                }
                .container {
                    max-width: 700px;
                    margin: 20px auto;
                    padding: 20px;
                    border: 1px solid #ddd;
                    border-radius: 10px;
                }
                h2 {
                    color: #4CAF50;
                    text-align: center;
                }
                h3 {
                    color: #4CAF50;
                }
                table {
                    width: 100%;
                    border-collapse: collapse;
                    margin-bottom: 20px;
                }
                th, td {
                    border: 1px solid #ddd;
                    padding: 8px;
                    text-align: left;
                }
                th {
                    background-color: #4CAF50;
                    color: white;
                }
                .footer {
                    text-align: center;
                    color: grey;
                    font-size: 12px;
                    margin-top: 20px;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <h2>Invoice ${invoice.invoiceNumber}</h2>
                <p>Dear ${invoice.customer.username},</p>
                <h3>Invoice Details</h3>
                <p><strong>Invoice Date:</strong> ${new Date(invoice.invoiceDate).toLocaleDateString()}</p>
                <p><strong>Due Date:</strong> ${new Date(invoice.dueDate).toLocaleDateString()}</p>
                <p><strong>Payment Status:</strong> ${invoice.paymentStatus}</p>
                <h3>Customer Details</h3>
                <p><strong>Name:</strong> ${invoice.customer.username}</p>
                <p><strong>Address:</strong> ${invoice.customer.address}</p>
                <p><strong>Email:</strong> ${invoice.customer.email}</p>
                <p><strong>Phone:</strong> ${invoice.customer.phone}</p>
                <h3>Items</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Item</th>
                            <th>Quantity</th>
                            <th>Unit Price</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${invoice.items.map(item => `
                            <tr>
                                <td>${item.name}</td>
                                <td>${item.quantity}</td>
                                <td>${item.unitPrice.toFixed(2)}</td>
                                <td>${(item.quantity * item.unitPrice).toFixed(2)}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
                <h3>Summary</h3>
                <p><strong>Tax Rate:</strong> ${invoice.taxRate}%</p>
                <p><strong>Discount:</strong> ${invoice.discount}</p>
                <p><strong>Total Amount:</strong> ${invoice.totalAmount.toFixed(2)}</p>
                <div class="footer">
                    <p>Thank you for your business! © ${new Date().getFullYear()} Nikunj Khinchi</p>
                </div>
            </div>
        </body>
        </html>
    `;
};


const generateEmailTemplate = (invoice) => {
    return `
        <html>
        <head>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    color: #333;
                    margin: 0;
                    padding: 0;
                }
                .container {
                    max-width: 700px;
                    margin: 20px auto;
                    padding: 20px;
                    border: 1px solid #ddd;
                    border-radius: 10px;
                }
                h2 {
                    color: #4CAF50;
                    text-align: center;
                }
                h3 {
                    color: #4CAF50;
                }
                .footer {
                    text-align: center;
                    color: grey;
                    font-size: 12px;
                    margin-top: 20px;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <h2>Invoice ${invoice.invoiceNumber}</h2>
                <p>Dear ${invoice.customer.username},</p>
                <p>Please find attached your detailed invoice, ${invoice.invoiceNumber}.pdf</p>
                <h3>Invoice Details</h3>
                <p><strong>Invoice Date:</strong> ${new Date(invoice.invoiceDate).toLocaleDateString()}</p>
                <p><strong>Due Date:</strong> ${new Date(invoice.dueDate).toLocaleDateString()}</p>
                <p><strong>Payment Status:</strong> ${invoice.paymentStatus}</p>
                <div class="footer">
                    <p>Thank you for your business! © ${new Date().getFullYear()} Nikunj Khinchi</p>
                </div>
            </div>
        </body>
        </html>
    `;
};

module.exports = { generateEmailTemplate, generatPDFTemplate };
