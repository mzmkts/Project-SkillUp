const express = require('express');
const router = express.Router();
const {
    getCourses,
    deleteCourse,
    updateCourse,
    getCourseById,
    addReview,
    createCourse
} = require('./controllers/courseController');
const {authenticateToken} = require('./controllers/authController');

router.get('/', getCourses);
router.delete('/:id', authenticateToken, deleteCourse);
router.put('/:id', authenticateToken, updateCourse);
router.get('/:id', getCourseById);
router.post('/:id/reviews', authenticateToken, addReview);
router.post('/', authenticateToken, createCourse);

module.exports = router;
