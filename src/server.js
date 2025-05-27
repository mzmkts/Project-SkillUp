const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const sequelize = require('./backend/config/db');
require('./backend/models/User')
require('./backend/models/Course');
const userRoutes = require('./backend/userRoutes');
const courseRoutes = require('./backend/courseRoutes');
const authRoutes = require('./backend/auth');
const User = require('./backend/models/User');
const bcrypt = require('bcrypt');
const path = require('path');

const app = express();
const PORT = 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Роуты
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/courses', courseRoutes);
app.use('/uploads', express.static(path.join(__dirname, 'backend', 'uploads')));

async function createAdmin() {
    const existing = await User.findOne({where: {email: 'admin@example.com'}});
    if (!existing) {
        await User.create({
            username: 'admin',
            email: 'admin@example.com',
            password: 'admin',
            role: 'admin',
            age: 30,
            gender: 'male'

        });
        console.log('✅ Admin account created');
    } else {
        console.log('ℹ️ Admin already exists');
    }
}

// Синхронизация базы и запуск сервера
sequelize.sync({alter: true})
    .then(async () => {
        console.log('✅ Database synced');
        await createAdmin();
        app.listen(PORT, () => {
            console.log(`🚀 Server is running on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error('❌ Failed to sync database:', err);
    });

