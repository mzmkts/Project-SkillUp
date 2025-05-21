const User = require('./User');
const Course = require('./Course');

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

module.exports = { User, Course };