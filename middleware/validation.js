const Joi = require('joi');

const createStudentSchema = Joi.object({
  fullName: Joi.string()
    .trim()
    .pattern(/^[A-Za-z]+(?: [A-Za-z]+)*$/)
    .min(3)
    .required()
    .messages({
      'any.required': 'Full name must be entered.',
      'string.empty': 'Full name cannot be empty.',
      'string.min': 'Full name must be at least 3 characters long.',
      'string.pattern.base': 'Full name can only contain letters and single spaces between names.',
    }),

  email: Joi.string()
    .trim()
    .lowercase()
    .email()
    .required()
    .messages({
      'any.required': 'Email is required.',
      'string.empty': 'Email cannot be empty.',
      'string.email': 'Email field must be a valid email address.',
    }),

  phone: Joi.string()
    .trim()
    .pattern(/^\d{10,15}$/)
    .required()
    .messages({
      'any.required': 'Phone number is required.',
      'string.empty': 'Phone number cannot be empty.',
      'string.pattern.base': 'Phone number must contain only digits and be between 10 and 15 digits.',
    }),

  department: Joi.string()
    .trim()
    .min(2)
    .required()
    .messages({
      'any.required': 'Department is required.',
      'string.empty': 'Department cannot be empty.',
      'string.min': 'Department must be at least 2 characters long.',
    }),

  profileImage: Joi.string()
    .trim()
    .required()
    .messages({
      'any.required': 'Profile image is required.',
      'string.empty': 'Profile image cannot be empty.',
    }),

  galleryImages: Joi.array()
    .items(Joi.string().trim().min(1))
    .min(2)
    .required()
    .messages({
      'any.required': 'Gallery images are required.',
      'array.base': 'Gallery images must be an array of image paths or URLs.',
      'array.min': 'At least two gallery image is required.',
    }),

  passportImage: Joi.string()
    .trim()
    .required()
    .messages({
      'any.required': 'Passport image is required.',
      'string.empty': 'Passport image cannot be empty.',
    }),

  identityCardImage: Joi.string()
    .trim()
    .required()
    .messages({
      'any.required': 'Identity card image is required.',
      'string.empty': 'Identity card image cannot be empty.',
    }),
});

const createStudentValidation = (req, res, next) => {
  const { error, value } = createStudentSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  req.body = value;
  return next();
};

module.exports = { createStudentValidation };
