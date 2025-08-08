const express = require('express');
const {
  registerUser,
  loginUser,
  logoutUser,
  refreshTokenController
} = require('../controllers/userControllers.js');
const authenticateToken = require('../middlewares/auth.js');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management and authentication
 */

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Register a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The user's name
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 description: The user's email
 *                 example: johndoe@example.com
 *               password:
 *                 type: string
 *                 description: The user's password
 *                 example: password123
 *     responses:
 *       201:
 *         description: User registered successfully
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
 *                   $ref: '#/components/schemas/UserResponse'
 *       409:
 *         description: Email already in use
 *       500:
 *         description: Internal server error
 */
router.post('/register', registerUser);

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Log in a user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: The user's email
 *                 example: johndoe@example.com
 *               password:
 *                 type: string
 *                 description: The user's password
 *                 example: password123
 *     responses:
 *       200:
 *         description: User logged in successfully
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
 *                   $ref: '#/components/schemas/UserResponse'
 *       401:
 *         description: Invalid email or password
 *       500:
 *         description: Internal server error
 */
router.post('/login', loginUser);

/**
 * @swagger
 * /logout:
 *   post:
 *     summary: Log out a user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 description: The user's ID
 *                 example: 64b8f9e2e4b0f5a1c2d3e4f5
 *     responses:
 *       204:
 *         description: User logged out successfully
 *       401:
 *         description: Not authorized
 *       500:
 *         description: Internal server error
 */
router.post('/logout', authenticateToken, logoutUser);

/**
 * @swagger
 * /refresh-token:
 *   post:
 *     summary: Refresh the access token
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RefreshTokenRequest'
 *     responses:
 *       200:
 *         description: Access token refreshed successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RefreshTokenResponse'
 *       401:
 *         description: Refresh token required
 *       403:
 *         description: Invalid or expired refresh token
 *       500:
 *         description: Internal server error
 */
router.post('/refresh-token', refreshTokenController);

module.exports = router;