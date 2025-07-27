const express = require('express');
const {
  addTransaction,
  editTransaction,
  getAllTransactions,
  getTransactionById
} = require('../controllers/transactionControllers.js');

const router = express.Router();

router.get('/home', getAllTransactions);
router.get('/home/:id', getTransactionById);
router.post('/home', addTransaction);
router.put('/home/:id', editTransaction);

module.exports = router;