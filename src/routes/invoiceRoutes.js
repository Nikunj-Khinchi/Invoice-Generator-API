const express = require('express');
const router = express.Router();
const invoiceController = require('../controllers/invoiceController');
const { authenticateUser, authorizeRole } = require('../middlewares/authMiddleware');
const validateRequest = require('../middlewares/validationMiddleware');
const { createInvoiceSchema, updateInvoiceSchema } = require('../validations/invoiceValidation');

/**
 * @swagger
 * components:
 *   schemas:
 *     Invoice:
 *       type: object
 *       required:
 *         - customerId
 *         - dueDate
 *         - items
 *         - taxRate
 *         - discount
 *       properties:
 *         customerId:
 *           type: string
 *         dueDate:
 *           type: string
 *           format: date
 *         items:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               quantity:
 *                 type: integer
 *               unitPrice:
 *                 type: number
 *         taxRate:
 *           type: number
 *         discount:
 *           type: number
 *     InvoiceUpdate:
 *       type: object
 *       properties:
 *         dueDate:
 *           type: string
 *           format: date
 *         items:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               _id:
 *                 type: string
 *               name:
 *                 type: string
 *               quantity:
 *                 type: integer
 *               unitPrice:
 *                 type: number
 *         taxRate:
 *           type: number
 *         discount:
 *           type: number
 *     InvoiceResponse:
 *       type: object
 *       properties:
 *         customerId:
 *           type: string
 *         dueDate:
 *           type: string
 *           format: date
 *         items:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               _id:
 *                 type: string
 *               name:
 *                 type: string
 *               quantity:
 *                 type: integer
 *               unitPrice:
 *                 type: number
 *         taxRate:
 *           type: number
 *         discount:
 *           type: number
 *         totalAmount:
 *           type: number
 *         paymentStatus:
 *           type: string
 *         createdBy:
 *           type: string
 */

/**
 * @swagger
 * /api/invoice:
 *   post:
 *     summary: Create a new invoice
 *     tags: [Invoices]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Invoice'
 *     responses:
 *       201:
 *         description: Invoice created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/InvoiceResponse'
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */
router.post('/', authenticateUser, authorizeRole(['admin']), validateRequest(createInvoiceSchema), invoiceController.createInvoice);

/**
 * @swagger
 * /api/invoice:
 *   get:
 *     summary: Get all invoice
 *     tags: [Invoices]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all invoice
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/InvoiceResponse'
 *       401:
 *         description: Unauthorized
 */
router.get('/', authenticateUser, invoiceController.getAllInvoices);

/**
 * @swagger
 * /api/invoice/{id}:
 *   get:
 *     summary: Get a specific invoice by ID
 *     tags: [Invoices]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Invoice ID
 *     responses:
 *       200:
 *         description: Invoice details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/InvoiceResponse'
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Invoice not found
 */
router.get('/:id', authenticateUser, invoiceController.getInvoiceById);

/**
 * @swagger
 * /api/invoice/{id}:
 *   patch:
 *     summary: Update an invoice
 *     tags: [Invoices]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Invoice ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/InvoiceUpdate'
 *     responses:
 *       200:
 *         description: Invoice updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/InvoiceResponse'
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Invoice not found
 */
router.patch('/:id', authenticateUser, authorizeRole(['admin']), validateRequest(updateInvoiceSchema), invoiceController.updateInvoice);

/**
 * @swagger
 * /api/invoice/{id}:
 *   delete:
 *     summary: Mark an invoice as deleted
 *     tags: [Invoices]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Invoice ID
 *     responses:
 *       200:
 *         description: Invoice marked as deleted successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Invoice not found
 */
router.delete('/:id', authenticateUser, authorizeRole(['admin']), invoiceController.deleteInvoice);

module.exports = router;