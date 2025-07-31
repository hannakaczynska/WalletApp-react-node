const express = require('express');
const {
  getStatistics
} = require('../controllers/statisticsControllers.js');
const authenticateToken = require('../middlewares/auth.js'); 

const router = express.Router();

router.get('/diagram', authenticateToken, getStatistics);

module.exports = router;