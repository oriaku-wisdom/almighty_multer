const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, './uploads');
    },

    filename: (req, file, callback) => {
        const date = Date.now();
        const randNumber = Math.floor(Math.random() * 1E8);
        const extension = file.originalname.split('.').pop();
        const filename = `IMG_${date}_${randNumber}.${extension}`;

        callback(null, filename);
    }
});

const fileFilter = (req, file, callback) => {
    if (
        file.mimetype === 'image/jpeg' ||
        file.mimetype === 'image/jpg' ||
        file.mimetype === 'image/png'
    ) {
        callback(null, true);
    } else {
        callback(new Error('Only JPG, JPEG and PNG images are allowed!'));
    }
};

const limits = {
    fileSize: 1024 * 1024 * 2
};

const upload = multer({
    storage,
    fileFilter,
    limits
});

module.exports = upload;