const express = require('express');
const router = express.Router();
const { getCourses, deleteCourse, updateCourse,getCourseById, addReview} = require('./controllers/courseController');
const { authenticateToken } = require('./controllers/authController');

router.get('/', getCourses);
router.delete('/:id', authenticateToken, deleteCourse);
router.put('/:id', authenticateToken, updateCourse);
router.get('/:id', getCourseById);
router.post('/:id/reviews', authenticateToken, addReview);

module.exports = router;
