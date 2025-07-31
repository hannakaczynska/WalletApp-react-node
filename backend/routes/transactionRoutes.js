const express = require('express');
const {
  addTransaction,
  editTransaction,
  getAllTransactions,
  getTransactionById,
  deleteTransaction
} = require('../controllers/transactionControllers.js');
const authenticateToken = require('../middlewares/auth.js'); 

const router = express.Router();

router.get('/home', authenticateToken, getAllTransactions);
router.get('/home/:id', authenticateToken, getTransactionById);
router.post('/home', authenticateToken, addTransaction);
router.put('/home/:id', authenticateToken, editTransaction);
router.delete('/home/:id', authenticateToken, deleteTransaction);

module.exports = router;