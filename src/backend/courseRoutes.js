const express = require('express');
const router = express.Router();
const { getCourses, deleteCourse, updateCourse,getCourseById } = require('./controllers/courseController');
const { authenticateToken } = require('./controllers/authController');

router.get('/', getCourses);
router.delete('/:id', authenticateToken, deleteCourse);
router.put('/:id', authenticateToken, updateCourse);
router.get('/:id', getCourseById);

module.exports = router;
