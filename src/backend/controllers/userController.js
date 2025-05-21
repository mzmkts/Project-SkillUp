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
        if (!user) return res.status(404).json({error: 'Not found'});
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

module.exports = {getUsers, deleteUser, updateUserAdmin};