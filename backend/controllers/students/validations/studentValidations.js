const { body } = require('express-validator');

const StudentValidations = [
  body('name').notEmpty().withMessage('Name is required'),
  body('age').optional({ checkFalsy: true }).isInt({ min: 1 }).withMessage('Age must be a positive integer'),
  body('gender').optional({ checkFalsy: true}).isString().withMessage('Gender must be a string'),
  body('address').optional({ checkFalsy: true}).isString().withMessage('Address must be a string'),
  body('roomID').optional({ checkFalsy: true}).isInt({ min: 1 }).withMessage('Room ID must be a positive integer'),
];

module.exports = {
  StudentValidations,
};

