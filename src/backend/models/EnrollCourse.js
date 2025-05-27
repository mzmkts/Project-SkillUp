const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const EnrollCourse = sequelize.define('EnrollCourse', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    },
    courseId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'courses',
            key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    },
    purchasedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    }
}, {
    schema: 'public',
    tableName: 'enroll_course',
    freezeTableName: true,
    timestamps: false,
    indexes: [
        {
            unique: true,
            fields: ['userId', 'courseId']
        }
    ]
});

module.exports = EnrollCourse;
