
const{ student }= require('../models');
const fs = require('fs');


exports.createStudent = async (req, res) => {
    try {
        const { fullName, email, phone, department } = req.body;

        let file;

        if (req.file) {
            file = req.file.filename;
        } else {
            file = null;
        }

        const data = {
            fullName,
            email,
            phone,
            department,
            profileImage: file,
            galleryImages: []
        };

        const newStudent = await student.create(data);

        res.status(201).json({
            message: 'Student added successfully',
            data: newStudent
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};


exports.getAllStudents = async (req, res) => {
    try {
        const students = await student.findAll();

        res.status(200).json({
            message: 'Students fetched successfully',
            data: students
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};


exports.getOneStudent = async (req, res) => {
    try {
        const id = req.params.id;

        const finder = await student.findByPk(id);

        if (!finder) {
            return res.status(404).json({
                message: 'Student not found'
            });
        }

        res.status(200).json({
            message: 'Student fetched successfully',
            data: finder
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};


exports.updateStudent = async (req, res) => {
    try {
        const id = req.params.id;

        const finder = await student.findByPk(id);

        if (!finder) {
            return res.status(404).json({
                message: 'Student not found'
            });
        }

        const { fullName, email, phone, department } = req.body;

        const data = {
            fullName,
            email,
            phone,
            department,
            profileImage: finder.profileImage
        };

        if (req.file) {
            const oldImage = finder.profileImage;

            data.profileImage = req.file.filename;

            await finder.update(data);

            if (oldImage) {
                const oldpath = './uploads/' + oldImage;

                if (fs.existsSync(oldpath)) {
                    fs.unlinkSync(oldpath);
                }
            }

        } else {
            await finder.update(data);
        }

        res.status(200).json({
            message: 'Student updated successfully',
            data: finder
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};


exports.uploadGallery = async (req, res) => {
    try {
        const id = req.params.id;

        const finder = await student.findByPk(id);

        if (!finder) {
            return res.status(404).json({
                message: 'This id does not exist'
            });
        }

        const data = {};

        const galleryImage = req.files.map((e) => e.filename);

        if (finder.galleryImages) {
            data.galleryImages = galleryImage.concat(finder.galleryImages);
        } else {
            data.galleryImages = galleryImage;
        }

        const update = await finder.update(data);

        res.status(200).json({
            message: 'Gallery uploaded successfully',
            data: update
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};


exports.uploadMultipleImages = async (req, res) => {
    try {
        const id = req.params.id;

        const finder = await student.findByPk(id);

        if (!finder) {
            return res.status(404).json({
                message: 'This id does not exist'
            });
        }

        const {
            passportImage,
            identityCardImage,
            profileImage,
            galleryImages
        } = req.files;

        const data = {};

        if (passportImage) {
            data.passportImage = passportImage[0].filename;
        }

        if (identityCardImage) {
            data.identityCardImage = identityCardImage[0].filename;
        }

        if (profileImage) {
            data.profileImage = profileImage[0].filename;
        }

        if (galleryImages) {
            const galleryImage = galleryImages.map((file) => file.filename);

            if (finder.galleryImages) {
                data.galleryImages = galleryImage.concat(finder.galleryImages);
            } else {
                data.galleryImages = galleryImage;
            }
        }

        const update = await finder.update(data);

        res.status(200).json({
            message: 'Images uploaded successfully',
            data: update
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};


exports.deleteStudent = async (req, res) => {
    try {
        const id = req.params.id;

        const finder = await student.findByPk(id);

        if (!finder) {
            return res.status(404).json({
                message: 'Student with this id not found'
            });
        }

        if (finder.profileImage) {
            const oldpath = './uploads/' + finder.profileImage;

            if (fs.existsSync(oldpath)) {
                fs.unlinkSync(oldpath);
            }
        }

        if (finder.galleryImages && finder.galleryImages.length > 0) {
            finder.galleryImages.forEach(element => {
                const oldpath = './uploads/' + element;

                if (fs.existsSync(oldpath)) {
                    fs.unlinkSync(oldpath);
                }
            });
        }

        if (finder.passportImage) {
            const oldpath = './uploads/' + finder.passportImage;

            if (fs.existsSync(oldpath)) {
                fs.unlinkSync(oldpath);
            }
        }

        if (finder.identityCardImage) {
            const oldpath = './uploads/' + finder.identityCardImage;

            if (fs.existsSync(oldpath)) {
                fs.unlinkSync(oldpath);
            }
        }

        await finder.destroy();

        res.status(200).json({
            message: 'Student deleted successfully'
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};