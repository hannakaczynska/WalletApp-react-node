const express = require('express');
const {
  addTransaction,
  editTransaction,
  getAllTransactions
} = require('../controllers/transactionControllers.js');

const router = express.Router();

router.get('/home', getAllTransactions);
router.post('/home', addTransaction);
router.put('/home/:id', editTransaction);

module.exports = router;