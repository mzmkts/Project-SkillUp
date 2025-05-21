const Course = require('../models/Course');
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
        });

        res.json({courses: rows, total: count});
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
        const course = await Course.findByPk(id);
        if (!course) {
            return res.status(404).json({message: 'Course not found'});
        }
        res.json(course);
    } catch (err) {
        res.status(500).json({message: 'Server error'});
    }
};

module.exports = {getCourses, deleteCourse, updateCourse, getCourseById};
