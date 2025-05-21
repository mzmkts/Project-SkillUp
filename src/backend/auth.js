const express = require('express');
const router = express.Router();
const { register, login, getCurrentUser, me, authenticateToken } = require('./controllers/authController');

router.post('/register', register);
router.post('/login', login);
router.get('/getCurrentUser', getCurrentUser);
router.get('/me', authenticateToken, me);

module.exports = router;
