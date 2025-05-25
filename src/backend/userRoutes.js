const express = require('express');
const router = express.Router();
const {getUsers, updateUserAdmin, deleteUser, updateUser, uploadAvatar} = require('./controllers/userController');
const {authenticateToken} = require('./controllers/authController');
const upload = require('./controllers/uploadAvatar');
router.get('/', authenticateToken, getUsers);           // GET /api/users
router.put('/:id', authenticateToken, updateUserAdmin); // PUT /api/users/:id (админ обновляет пользователя)
router.delete('/:id', authenticateToken, deleteUser);   // DELETE /api/users/:id
router.put('/update/:id', authenticateToken, updateUser)
router.post(
    '/uploadAvatar/:id',
    authenticateToken,
    upload.single('avatar'),
    uploadAvatar
);
router.put('/admin/update/:id', updateUserAdmin);


module.exports = router;
