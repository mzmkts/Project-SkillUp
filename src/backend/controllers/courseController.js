const Course = require('../models/Course');
const Review = require('../models/Review');
const User = require('../models/User');

const {Op} = require('sequelize');

const getCourses = async (req, res) => {
    try {
        const {category, search, sort, page = 1, limit = 8} = req.query;

        const where = {};

        if (category) {
            where.category = category;
        }

        if (search) {
            where.title = {
                [Op.iLike]: `%${search}%`,
            };
        }

        const order = [];
        if (sort === 'alphabetical') {
            order.push(['title', 'ASC']);
        } else {
            order.push(['createdAt', 'DESC']);
        }

        const offset = (parseInt(page) - 1) * parseInt(limit);
        const {rows, count} = await Course.findAndCountAll({
            where,
            order,
            limit: parseInt(limit),
            offset,
            include: [{model: Review, as: 'reviews'}]
        });

        // Добавляем поле averageRating в каждый курс
        const coursesWithRating = rows.map(course => {
            const reviews = course.reviews || [];
            const averageRating =
                reviews.length > 0
                    ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
                    : null;

            return {
                ...course.toJSON(),
                averageRating: averageRating ? Number(averageRating.toFixed(1)) : null
            };
        });

        res.json({courses: coursesWithRating, total: count});
    } catch (error) {
        console.error(error);
        res.status(500).json({error: error.message});
    }
};

const deleteCourse = async (req, res) => {
    try {
        await Course.destroy({where: {id: req.params.id}});
        res.json({message: 'Course deleted'});
    } catch (err) {
        res.status(500).json({error: err.message});
    }
};
const updateCourse = async (req, res) => {
    try {
        const {id} = req.params;
        const {title, description, category, price} = req.body;
        const course = await Course.findByPk(id);
        if (!course) return res.status(404).json({error: 'Not found'});
        if (title) course.title = title;
        if (description) course.description = description;
        if (category) course.category = category;
        if (price !== undefined) course.price = price;
        await course.save();
        res.json(course);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
};

const getCourseById = async (req, res) => {
    try {
        const id = req.params.id;
        const course = await Course.findByPk(id, {
            include: [
                {
                    model: Review,
                    as: 'reviews',
                    include: [
                        {
                            model: User,
                            as: 'user',
                            attributes: ['username']
                        }
                    ]
                }
            ]
        });

        if (!course) {
            return res.status(404).json({message: 'Course not found'});
        }

        const courseData = course.toJSON();

        courseData.reviews = courseData.reviews.map(review => ({
            id: review.id,
            comment: review.comment,
            rating: review.rating,
            createdAt: review.createdAt,
            username: review.user ? review.user.username : 'Unknown'
        }));

        res.json(courseData);
    } catch (err) {
        res.status(500).json({message: 'Server error'});
    }
};


const addReview = async (req, res) => {
    try {
        const courseId = req.params.id;
        const {comment, rating} = req.body;
        const userId = req.user.id;  // from authenticateToken middleware

        // Проверяем, что курс существует
        const course = await Course.findByPk(courseId);
        if (!course) {
            return res.status(404).json({message: 'Course not found'});
        }

        // Создаем отзыв
        const review = await Review.create({
            comment,
            rating,
            userId,
            courseId,
        });

        res.status(201).json(review);
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Server error'});
    }
};
const createCourse = async (req, res) => {
    try {
        const {title, description, image, category, price} = req.body;

        if (!title) {
            return res.status(400).json({error: 'Title is required'});
        }

        const newCourse = await Course.create({
            title,
            description: description || '',
            image: image || '',
            category: category || 'other',
            price: price !== undefined ? price : 0.00
        });

        res.status(201).json(newCourse);
    } catch (err) {
        console.error('Error creating course:', err);
        res.status(500).json({error: 'Failed to create course'});
    }
};

module.exports = {getCourses, deleteCourse, updateCourse, getCourseById, addReview, createCourse};
