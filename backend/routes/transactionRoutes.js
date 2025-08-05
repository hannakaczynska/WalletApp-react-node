const express = require('express');
const {
  addTransaction,
  editTransaction,
  getAllTransactions,
  getTransactionById,
  deleteTransaction,
} = require('../controllers/transactionControllers.js');
const authenticateToken = require('../middlewares/auth.js');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Transactions
 *   description: API for managing transactions
 */

/**
 * @swagger
 * /home:
 *   get:
 *     summary: Get all transactions
 *     tags: [Transactions]
 *     parameters:
 *       - in: query
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the user
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         required: false
 *         description: Number of transactions to fetch
 *       - in: query
 *         name: offset
 *         schema:
 *           type: integer
 *         required: false
 *         description: Offset for pagination
 *     responses:
 *       200:
 *         description: List of transactions
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 code:
 *                   type: integer
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Transaction'
 *       500:
 *         description: Internal server error
 */
router.get('/home', authenticateToken, getAllTransactions);

/**
 * @swagger
 * /home/{id}:
 *   get:
 *     summary: Get a transaction by ID
 *     tags: [Transactions]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The transaction ID
 *     responses:
 *       200:
 *         description: Transaction details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 code:
 *                   type: integer
 *                 data:
 *                   $ref: '#/components/schemas/Transaction'
 *       404:
 *         description: Transaction not found
 *       500:
 *         description: Internal server error
 */
router.get('/home/:id', authenticateToken, getTransactionById);

/**
 * @swagger
 * /home:
 *   post:
 *     summary: Add a new transaction
 *     tags: [Transactions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Transaction'
 *     responses:
 *       201:
 *         description: Transaction created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 code:
 *                   type: integer
 *                 data:
 *                   $ref: '#/components/schemas/Transaction'
 *       500:
 *         description: Internal server error
 */
router.post('/home', authenticateToken, addTransaction);

/**
 * @swagger
 * /home/{id}:
 *   put:
 *     summary: Update a transaction
 *     tags: [Transactions]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The transaction ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Transaction'
 *     responses:
 *       200:
 *         description: Transaction updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 code:
 *                   type: integer
 *                 data:
 *                   $ref: '#/components/schemas/Transaction'
 *       404:
 *         description: Transaction not found
 *       500:
 *         description: Internal server error
 */
router.put('/home/:id', authenticateToken, editTransaction);

/**
 * @swagger
 * /home/{id}:
 *   delete:
 *     summary: Delete a transaction
 *     tags: [Transactions]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The transaction ID
 *     responses:
 *       200:
 *         description: Transaction deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 code:
 *                   type: integer
 *                 data:
 *                   $ref: '#/components/schemas/Transaction'
 *       404:
 *         description: Transaction not found
 *       500:
 *         description: Internal server error
 */
router.delete('/home/:id', authenticateToken, deleteTransaction);

module.exports = router;