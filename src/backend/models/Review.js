const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Course = require('./Course');
const User = require('./User');

const CourseReview = sequelize.define('CourseReview', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    courseId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Course,
            key: 'id',
        },
        field: 'course_id',
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id',
        },
        field: 'user_id',
    },
    rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 1,
            max: 5,
        },
    },
    comment: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
}, {
    schema: 'public',
    tableName: 'course_reviews',
    freezeTableName: true,
    timestamps: true,
    underscored: true,
});

// Ассоциации
Course.hasMany(CourseReview, { foreignKey: 'course_id', as: 'reviews' });
CourseReview.belongsTo(Course, { foreignKey: 'course_id', as: 'course' });

User.hasMany(CourseReview, { foreignKey: 'user_id', as: 'reviews' });
CourseReview.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

module.exports = CourseReview;
