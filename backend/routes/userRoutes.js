const express = require('express');
const {
registerUser,
loginUser,
logoutUser
} = require('../controllers/userControllers.js');
const authenticateToken = require('../middlewares/auth.js'); 

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', authenticateToken, logoutUser);

module.exports = router;