const express = require('express');
const {
  addTransaction,
  editTransaction,
} = require('../controllers/transactionControllers.js');

const router = express.Router();

router.post('/home', addTransaction);
router.put('/home/:id', editTransaction);

module.exports = router;