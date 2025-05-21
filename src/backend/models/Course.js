const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Course = sequelize.define('Course', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT
  },
  image: {
    type: DataTypes.STRING
  },
  category: {
    type: DataTypes.ENUM('programming', 'design', 'business', 'other'),
    defaultValue: 'other'
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0.00
  }
}, {
  schema: 'public',
  tableName: 'courses',
  freezeTableName: true,
  timestamps: true
});

module.exports = Course;
