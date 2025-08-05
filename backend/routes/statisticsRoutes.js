const express = require('express');
const {
  getStatistics
} = require('../controllers/statisticsControllers.js');
const authenticateToken = require('../middlewares/auth.js'); 

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Statistics
 *   description: API for fetching statistics
 */

/**
 * @swagger
 * /diagram:
 *   get:
 *     summary: Get statistics for a user
 *     tags: [Statistics]
 *     parameters:
 *       - in: query
 *         name: month
 *         schema:
 *           type: integer
 *         required: false
 *         description: The month for which to fetch statistics (1-12)
 *       - in: query
 *         name: year
 *         schema:
 *           type: integer
 *         required: false
 *         description: The year for which to fetch statistics
 *       - in: query
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the user
 *     responses:
 *       200:
 *         description: Statistics fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 code:
 *                   type: integer
 *                   example: 200
 *                 data:
 *                   type: object
 *                   properties:
 *                     expenses:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/ExpenseStatistics'
 *                     income:
 *                       $ref: '#/components/schemas/IncomeStatistics'
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
router.get('/diagram', authenticateToken, getStatistics);

module.exports = router;