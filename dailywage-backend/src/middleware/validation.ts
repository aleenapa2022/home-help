import { Request, Response, NextFunction } from 'express';
import { body, query, param, validationResult } from 'express-validator';

// Handle validation errors
export const handleValidationErrors = (req: Request, res: Response, next: NextFunction): void => {
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array()
    });
    return;
  }
  
  next();
};

// User registration validation
export const validateRegistration = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Name is required')
    .isLength({ min: 2, max: 100 })
    .withMessage('Name must be between 2 and 100 characters'),
  
  body('email')
    .isEmail()
    .withMessage('Please provide a valid email')
    .normalizeEmail(),
  
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long')
    .matches(/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage('Password must contain at least one uppercase letter, one lowercase letter, and one number'),
  
  body('phone')
    .isMobilePhone('en-IN')
    .withMessage('Please provide a valid Indian phone number'),
  
  body('address')
    .trim()
    .notEmpty()
    .withMessage('Address is required'),
  
  body('city')
    .trim()
    .notEmpty()
    .withMessage('City is required'),
  
  body('state')
    .trim()
    .notEmpty()
    .withMessage('State is required'),
  
  body('pincode')
    .matches(/^[1-9][0-9]{5}$/)
    .withMessage('Please provide a valid 6-digit pincode'),
  
  body('userType')
    .isIn(['customer', 'worker'])
    .withMessage('User type must be either customer or worker'),
  
  handleValidationErrors
];

// User login validation
export const validateLogin = [
  body('email')
    .isEmail()
    .withMessage('Please provide a valid email')
    .normalizeEmail(),
  
  body('password')
    .notEmpty()
    .withMessage('Password is required'),
  
  handleValidationErrors
];

// Worker profile validation
export const validateWorkerProfile = [
  body('services')
    .isArray({ min: 1 })
    .withMessage('At least one service must be selected'),
  
  body('services.*')
    .isIn([
      'Electrical Work', 'Plumbing', 'House Cleaning', 'Gardening',
      'Painting', 'Appliance Repair', 'Carpentry', 'Masonry',
      'Tile Work', 'AC Repair', 'Computer Repair', 'Moving & Packing', 'Other'
    ])
    .withMessage('Invalid service type'),
  
  body('skills')
    .isArray({ min: 1 })
    .withMessage('At least one skill must be provided'),
  
  body('experience')
    .isInt({ min: 0, max: 50 })
    .withMessage('Experience must be between 0 and 50 years'),
  
  body('hourlyRate')
    .isFloat({ min: 50, max: 5000 })
    .withMessage('Hourly rate must be between ₹50 and ₹5000'),
  
  body('description')
    .trim()
    .notEmpty()
    .withMessage('Description is required')
    .isLength({ max: 1000 })
    .withMessage('Description cannot exceed 1000 characters'),
  
  body('languages')
    .isArray({ min: 1 })
    .withMessage('At least one language must be selected'),
  
  body('workRadius')
    .isInt({ min: 1, max: 100 })
    .withMessage('Work radius must be between 1 and 100 km'),
  
  body('emergencyContact.name')
    .trim()
    .notEmpty()
    .withMessage('Emergency contact name is required'),
  
  body('emergencyContact.phone')
    .isMobilePhone('en-IN')
    .withMessage('Please provide a valid emergency contact phone number'),
  
  body('emergencyContact.relation')
    .trim()
    .notEmpty()
    .withMessage('Emergency contact relation is required'),
  
  handleValidationErrors
];

// Booking validation
export const validateBooking = [
  body('workerId')
    .isMongoId()
    .withMessage('Invalid worker ID'),
  
  body('serviceType')
    .isIn([
      'Electrical Work', 'Plumbing', 'House Cleaning', 'Gardening',
      'Painting', 'Appliance Repair', 'Carpentry', 'Masonry',
      'Tile Work', 'AC Repair', 'Computer Repair', 'Moving & Packing', 'Other'
    ])
    .withMessage('Invalid service type'),
  
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Title is required')
    .isLength({ max: 200 })
    .withMessage('Title cannot exceed 200 characters'),
  
  body('description')
    .trim()
    .notEmpty()
    .withMessage('Description is required')
    .isLength({ max: 1000 })
    .withMessage('Description cannot exceed 1000 characters'),
  
  body('scheduledDate')
    .isISO8601()
    .withMessage('Please provide a valid date')
    .custom((value) => {
      const date = new Date(value);
      const now = new Date();
      if (date <= now) {
        throw new Error('Scheduled date must be in the future');
      }
      return true;
    }),
  
  body('timeSlot')
    .matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]-([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)
    .withMessage('Invalid time slot format (HH:MM-HH:MM)'),
  
  body('estimatedHours')
    .isFloat({ min: 0.5, max: 24 })
    .withMessage('Estimated hours must be between 0.5 and 24'),
  
  body('customerLocation.address')
    .trim()
    .notEmpty()
    .withMessage('Customer address is required'),
  
  body('customerLocation.city')
    .trim()
    .notEmpty()
    .withMessage('City is required'),
  
  body('customerLocation.state')
    .trim()
    .notEmpty()
    .withMessage('State is required'),
  
  body('customerLocation.pincode')
    .matches(/^[1-9][0-9]{5}$/)
    .withMessage('Please provide a valid 6-digit pincode'),
  
  handleValidationErrors
];

// Review validation
export const validateReview = [
  body('rating')
    .isInt({ min: 1, max: 5 })
    .withMessage('Rating must be between 1 and 5'),
  
  body('comment')
    .optional()
    .trim()
    .isLength({ max: 1000 })
    .withMessage('Comment cannot exceed 1000 characters'),
  
  handleValidationErrors
];

// Search validation
export const validateSearch = [
  query('services')
    .optional()
    .custom((value) => {
      if (typeof value === 'string') {
        value = [value];
      }
      if (Array.isArray(value)) {
        const validServices = [
          'Electrical Work', 'Plumbing', 'House Cleaning', 'Gardening',
          'Painting', 'Appliance Repair', 'Carpentry', 'Masonry',
          'Tile Work', 'AC Repair', 'Computer Repair', 'Moving & Packing', 'Other'
        ];
        const invalidServices = value.filter(service => !validServices.includes(service));
        if (invalidServices.length > 0) {
          throw new Error(`Invalid services: ${invalidServices.join(', ')}`);
        }
      }
      return true;
    }),
  
  query('location')
    .optional()
    .trim()
    .isLength({ min: 2 })
    .withMessage('Location must be at least 2 characters'),
  
  query('radius')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('Radius must be between 1 and 100 km'),
  
  query('minPrice')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Minimum price must be a positive number'),
  
  query('maxPrice')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Maximum price must be a positive number'),
  
  query('rating')
    .optional()
    .isFloat({ min: 0, max: 5 })
    .withMessage('Rating must be between 0 and 5'),
  
  query('experience')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Experience must be a positive number'),
  
  query('verifiedOnly')
    .optional()
    .isBoolean()
    .withMessage('Verified only must be a boolean value'),
  
  handleValidationErrors
];

// Pagination validation
export const validatePagination = [
  query('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Page must be a positive integer'),
  
  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('Limit must be between 1 and 100'),
  
  query('sort')
    .optional()
    .isIn(['name', 'rating', 'experience', 'hourlyRate', 'createdAt'])
    .withMessage('Invalid sort field'),
  
  query('order')
    .optional()
    .isIn(['asc', 'desc'])
    .withMessage('Order must be either asc or desc'),
  
  handleValidationErrors
];

// MongoDB ObjectId validation
export const validateObjectId = (field: string) => [
  param(field)
    .isMongoId()
    .withMessage(`Invalid ${field}`),
  
  handleValidationErrors
];

// Password reset validation
export const validatePasswordReset = [
  body('email')
    .isEmail()
    .withMessage('Please provide a valid email')
    .normalizeEmail(),
  
  handleValidationErrors
];

// Password update validation
export const validatePasswordUpdate = [
  body('token')
    .notEmpty()
    .withMessage('Reset token is required'),
  
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long')
    .matches(/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage('Password must contain at least one uppercase letter, one lowercase letter, and one number'),
  
  handleValidationErrors
];

// Profile update validation
export const validateProfileUpdate = [
  body('name')
    .optional()
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Name must be between 2 and 100 characters'),
  
  body('phone')
    .optional()
    .isMobilePhone('en-IN')
    .withMessage('Please provide a valid Indian phone number'),
  
  body('address')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Address cannot be empty'),
  
  body('city')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('City cannot be empty'),
  
  body('state')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('State cannot be empty'),
  
  body('pincode')
    .optional()
    .matches(/^[1-9][0-9]{5}$/)
    .withMessage('Please provide a valid 6-digit pincode'),
  
  handleValidationErrors
];