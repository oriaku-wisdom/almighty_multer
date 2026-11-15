
const router = require('express').Router();

const {
  createStudent,
  getAllStudents,
  getOneStudent,
  updateStudent,
  deleteStudent,
  uploadGallery,
  uploadMultipleImages
} = require('../controller/controller');

const upload = require('../middleware/multer');

const { createStudentValidation } = require('../middleware/validation');

router.post(
  '/students',
  upload.single('profileImage'),
  createStudentValidation,
  createStudent
);


router.get('/students', getAllStudents);


router.get('/students/:id', getOneStudent);


router.put('/students/:id', upload.single('profileImage'), updateStudent)
router.delete('/students/:id', deleteStudent);


router.post('/students/:id/gallery',upload.array('galleryImages', 5),uploadGallery);
 
  




router.post(
  '/students/:id/images',
  upload.fields([
    { name: 'passportImage', maxCount: 1 },
    { name: 'identityCardImage', maxCount: 1 },
    { name: 'profileImage', maxCount: 1 },
    { name: 'galleryImages', maxCount: 5 }
  ]),
  uploadMultipleImages
);

module.exports = router;