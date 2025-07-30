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
router.get('/home/:id', getTransactionById);
router.post('/home', addTransaction);
router.put('/home/:id', editTransaction);
router.delete('/home/:id', deleteTransaction);

module.exports = router;