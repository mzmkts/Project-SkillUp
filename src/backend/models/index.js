const User = require('./User');
const Course = require('./Course');
const Review = require('./Review');
const EnrollCourse = require('./EnrollCourse');

// Many-to-Many связь между User и Course через модель EnrollCourse
User.belongsToMany(Course, {
    through: EnrollCourse,
    as: 'courses',
    foreignKey: 'userId',
});

Course.belongsToMany(User, {
    through: EnrollCourse,
    as: 'students',
    foreignKey: 'courseId',
});

// One-to-Many: Course - Review
Course.hasMany(Review, {foreignKey: 'courseId', as: 'reviews'});
Review.belongsTo(Course, {foreignKey: 'courseId'});

// One-to-Many: User - Review
User.hasMany(Review, {foreignKey: 'userId', as: 'reviews'});
Review.belongsTo(User, {foreignKey: 'userId', as: 'user'});

module.exports = {
    User,
    Course,
    Review,
    EnrollCourse
};
