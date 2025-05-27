// routes/courseRoutes.js
const express = require('express');
const router = express.Router();
const {
    getCourses,
    getCourseById,
    createCourse,
    updateCourse,
    deleteCourse,
    addReview,
    enrollCourse,
    getMyCourses
} = require('./controllers/courseController');
const {authenticateToken} = require('./controllers/authController');

// Курсы
router.get('/', getCourses);
router.post('/', authenticateToken, createCourse);
router.put('/:id', authenticateToken, updateCourse);
router.delete('/:id', authenticateToken, deleteCourse);
router.get('/:id', getCourseById);

router.post('/:id/review', authenticateToken, addReview);
router.post('/:id/enroll', authenticateToken, enrollCourse);
router.get('/my/courses', authenticateToken, getMyCourses);


module.exports = router;
