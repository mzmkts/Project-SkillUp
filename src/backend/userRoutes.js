const express = require('express');
const router = express.Router();
const { getUsers, updateUserAdmin, deleteUser, updateUser } = require('./controllers/userController');
const { authenticateToken } = require('./controllers/authController');

router.get('/', authenticateToken, getUsers);           // GET /api/users
router.put('/:id', authenticateToken, updateUserAdmin); // PUT /api/users/:id (админ обновляет пользователя)
router.delete('/:id', authenticateToken, deleteUser);   // DELETE /api/users/:id
router.put('/update/:id', authenticateToken, updateUser);

module.exports = router;
