const express = require('express');
const router = express.Router();
const { getUsers, updateUserAdmin, deleteUser } = require('./controllers/userController');
const { authenticateToken } = require('./controllers/authController');

router.get('/', authenticateToken, getUsers); // /api/users
router.put('/:id', authenticateToken, updateUserAdmin);
router.delete('/:id', authenticateToken, deleteUser);

module.exports = router;
