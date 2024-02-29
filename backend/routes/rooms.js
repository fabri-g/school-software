const express = require('express');
const { validationResult } = require('express-validator');
const router = express.Router();
const roomsController = require('../controllers/roomsController');
const { RoomValidations } = require('../validations/roomValidations');

// GET all rooms
router.get('/', roomsController.getAllRooms);

// GET a single room by ID
router.get('/:id', roomsController.getRoomById);

// POST route for creating a new room
router.post('/', RoomValidations, (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  roomsController.createRoom(req, res, next);
});

// PUT route for updating a room
router.put('/:id', RoomValidations, (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  roomsController.updateRoomById(req, res, next);
});

// DELETE a room by ID
router.delete('/:id', roomsController.deleteRoomById);

module.exports = router;
