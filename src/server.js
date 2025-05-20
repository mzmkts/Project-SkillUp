const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const sequelize = require('./backend/config/db'); // подключение к БД
require('./backend/models/User'); // импортируем модель, чтобы зарегистрировать её в Sequelize

const authRoutes = require('./backend/auth');

const app = express();
const PORT = 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Роуты
app.use('/api/auth', authRoutes);

// Синхронизация базы и запуск сервера
sequelize.sync({ alter: true }) // или { force: false }, чтобы не удалять данные
    .then(() => {
        console.log('✅ Database synced');
        app.listen(PORT, () => {
            console.log(`🚀 Server is running on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error('❌ Failed to sync database:', err);
    });

