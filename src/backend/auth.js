// routes/auth.js
const express = require('express');
const router = express.Router();
const { register, login, updateUser, getCurrentUser, me, authenticateToken} = require('./controllers/authController');

router.post('/register', register);
router.post('/login', login);
router.get('/getCurrentUser', getCurrentUser);
router.get('/me', authenticateToken,me);
router.put('/updateUser', updateUser);
module.exports = router;
