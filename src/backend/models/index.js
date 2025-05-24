const User = require('./User');
const Course = require('./Course');
const Review = require('./Review');

User.belongsToMany(Course, {
    through: 'UserCourses',
    as: 'courses',
    foreignKey: 'userId'
});

Course.belongsToMany(User, {
    through: 'UserCourses',
    as: 'students',
    foreignKey: 'courseId'
});
Course.hasMany(Review, {foreignKey: 'courseId', as: 'reviews'});
Review.belongsTo(Course, {foreignKey: 'courseId'});
User.hasMany(Review, {foreignKey: 'userId', as: 'reviews'});
Review.belongsTo(User, {foreignKey: 'userId', as: 'user'});

module.exports = {User, Course, Review};

