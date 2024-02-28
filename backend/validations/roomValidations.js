const { body } = require('express-validator');

const RoomValidations = [
  body('name').isString().withMessage('Name must be a string'),
  body('currentCapacity').optional({ checkFalsy: true }).isInt({ min: 0 }).withMessage('Current capacity must be a non-negative integer'),
  body('maximumCapacity').optional({ checkFalsy: true }).isInt({ min: 1 }).withMessage('Maximum capacity must be a positive integer'),
  body('instructor').optional({ checkFalsy: true }).isString().withMessage('Instructor must be a string'),
];

module.exports = {
 RoomValidations,
};
