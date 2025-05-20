const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('course_platform', 'postgres', '123', {
  host: 'localhost',
  dialect: 'postgres',
  logging: false,
});
sequelize.authenticate()
    .then(() => console.log('DB connected'))
    .catch(err => console.error('DB connection error:', err));

module.exports = sequelize;
