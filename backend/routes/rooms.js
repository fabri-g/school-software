const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const roomsController = require('../controllers/roomsController');

// GET all rooms
router.get('/', roomsController.getAllRooms);

// GET a single room by ID
router.get('/:id', roomsController.getRoomById);

// POST route for creating a new room
router.post('/',
body('name').isString().withMessage('Name must be a string'),
body('currentCapacity').optional({ checkFalsy: true }).isInt({ min: 0 }).withMessage('Current capacity must be a non-negative integer'),
body('maximumCapacity').optional({ checkFalsy: true }).isInt({ min: 1 }).withMessage('Maximum capacity must be a positive integer'),
body('instructor').optional({ checkFalsy: true }).isString().withMessage('Instructor must be a string'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    roomsController.createRoom(req, res, next);
  }
);

// PUT route for updating a room
router.put('/:id',
body('name').isString().withMessage('Name must be a string'),
body('currentCapacity').optional({ checkFalsy: true }).isInt({ min: 0 }).withMessage('Current capacity must be a non-negative integer'),
body('maximumCapacity').optional({ checkFalsy: true }).isInt({ min: 1 }).withMessage('Maximum capacity must be a positive integer'),
body('instructor').optional({ checkFalsy: true }).isString().withMessage('Instructor must be a string'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    roomsController.updateRoomById(req, res, next);
  }
);

// DELETE a room by ID
router.delete('/:id', roomsController.deleteRoomById);

module.exports = router;
