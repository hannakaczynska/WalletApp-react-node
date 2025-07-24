const express = require('express');
const {
  getStatistics
} = require('../controllers/statisticsControllers.js');

const router = express.Router();

router.get('/diagram', getStatistics);

module.exports = router;