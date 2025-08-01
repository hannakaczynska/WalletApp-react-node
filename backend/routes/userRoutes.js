const express = require('express');
const {
registerUser,
logoutUser
} = require('../controllers/userControllers.js');


const router = express.Router();

router.post('/register', registerUser);
router.post('/logout', logoutUser);


module.exports = router;