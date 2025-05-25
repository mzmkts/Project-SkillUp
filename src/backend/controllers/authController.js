const jwt = require('jsonwebtoken');
const User = require('../models/User');
const {Op} = require('sequelize');
const bcrypt = require('bcrypt');
const {jwtSecret} = require('../../JWTtoken');

const register = async (req, res) => {
    try {
        const {username, email, password} = req.body;

        // Проверяем, что username или email не заняты
        const existingUser = await User.findOne({
            where: {
                [Op.or]: [{username}, {email}]
            }
        });

        if (existingUser) {
            return res.status(400).json({error: 'Username or email already exists'});
        }

        const user = await User.create({username, email, password});

        // Генерируем JWT токен
        const token = generateToken(user);

        res.status(201).json({user, token});
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

const login = async (req, res) => {
    try {
        const {username, password} = req.body;

        console.log('Login attempt:', username); // ✅ Добавить это

        const user = await User.findOne({where: {username}});
        if (!user) {
            return res.status(401).json({error: 'Invalid credentials'});
        }

        const isValid = await user.validPassword(password);  // 💥 Возможный источник ошибки
        if (!isValid) {
            return res.status(401).json({error: 'Invalid credentials'});
        }

        const token = generateToken(user);
        res.json({user, token});
    } catch (error) {
        console.error('Login error:', error);  // ✅ ОБЯЗАТЕЛЬНО
        res.status(500).json({error: error.message});
    }
};


function generateToken(user) {
    return jwt.sign(
        {id: user.id, username: user.username, role: user.role},
        jwtSecret,  // используй jwtSecret из конфига
        {expiresIn: '1d'}
    );
}

const getCurrentUser = async (req, res) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) return res.status(401).json({error: 'No token provided'});

        const token = authHeader.split(' ')[1];
        if (!token) return res.status(401).json({error: 'Token malformed'});

        const decoded = jwt.verify(token, jwtSecret);
        const user = await User.findByPk(decoded.id, {
            attributes: ['id', 'username', 'email', 'role', 'age', 'gender', 'avatar']
        });

        if (!user) return res.status(404).json({error: 'User not found'});

        res.json(user);
    } catch (err) {
        res.status(401).json({error: 'Invalid or expired token'});
    }
};
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) return res.status(401).json({error: 'No token'});

    const token = authHeader.split(' ')[1];
    if (!token) return res.status(401).json({error: 'No token'});

    jwt.verify(token, jwtSecret, (err, userData) => {
        if (err) return res.status(403).json({error: 'Invalid token'});
        req.user = userData;
        next();
    });
};

const me = async (req, res) => {
    try {
        const user = await User.findByPk(req.user.id, {
            attributes: ['id', 'username', 'email', 'role', 'age', 'gender', 'avatar']
        });

        if (!user) return res.status(404).json({error: 'User not found'});
        res.json(user);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};


module.exports = {register, login, getCurrentUser, authenticateToken, me};
