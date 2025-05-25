// middlewares/uploadAvatar.js
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Папка для хранения аватарок
const uploadDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, {recursive: true});
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, uploadDir),
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        cb(null, `avatar_${req.params.id}_${Date.now()}${ext}`);
    }
});

module.exports = multer({storage});