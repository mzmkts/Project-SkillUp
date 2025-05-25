const bcrypt = require('bcrypt');
const User = require('../models/User');

const getUsers = async (req, res) => {
    try {
        const users = await User.findAll({
            attributes: ['id', 'username', 'email', 'role', 'age', 'gender']
        });
        res.json(users);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
};

const deleteUser = async (req, res) => {
    try {
        const {id} = req.params;
        await User.destroy({where: {id}});
        res.json({message: 'User deleted'});
    } catch (err) {
        res.status(500).json({error: err.message});
    }
};

const updateUserAdmin = async (req, res) => {
    try {
        const {id} = req.params;
        const {username, age, gender, password} = req.body;
        const user = await User.findByPk(id);
        if (!user) return res.status(404).json({error: 'User not found'});

        if (username) user.username = username;
        if (age !== undefined) user.age = age;
        if (gender) user.gender = gender;

        if (password) {
            const hash = await bcrypt.hash(password, 10);
            user.password = hash;
        }

        await user.save();
        res.json(user);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
};

const updateUser = async (req, res) => {
    try {
        const {id} = req.params; // берём id из URL
        const {username, age, gender, password} = req.body; // остальное из тела

        if (!id) {
            return res.status(400).json({error: 'User ID is required'});
        }

        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({error: 'User not found'});
        }

        if (username) user.username = username;
        if (age !== undefined) user.age = age;
        if (gender) user.gender = gender;

        if (password) {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);
        }

        await user.save();

        res.json({message: 'User updated successfully'});
    } catch (err) {
        console.error(err);
        res.status(500).json({error: 'Server error'});
    }
};
const uploadAvatar = async (req, res) => {
    try {
        const {id} = req.params;
        if (!req.file) return res.status(400).json({error: 'No file uploaded'});

        const user = await User.findByPk(id);
        if (!user) return res.status(404).json({error: 'User not found'});

        user.avatar = `/uploads/${req.file.filename}`;
        await user.save();

        res.json({message: 'Avatar uploaded', avatar: user.avatar});
    } catch (err) {
        console.error(err);
        res.status(500).json({error: 'Failed to upload avatar'});
    }
};


module.exports = {getUsers, deleteUser, updateUserAdmin, updateUser, uploadAvatar};
