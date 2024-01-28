// roomsController.js

// Function to get all rooms
exports.getAllRooms = async (req, res) => {
  try {
      const rooms = []; // Replace with data fetching logic
      res.json(rooms);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
};

// Function to get a single room by ID
exports.getRoomById = async (req, res) => {
  try {
      const id = req.params.id;
      const room = {}; // Replace with actual data fetching logic
      res.json(room);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
};

// Function to create a new room
const { Room } = require('../models');

exports.createRoom = async (req, res) => {
  try {
      const { name, currentCapacity, maximumCapacity, instructor } = req.body;
      const newRoom = await Room.create({
          name,
          currentCapacity,
          maximumCapacity,
          instructor
      });
      res.status(201).json(newRoom);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
};

// Function to update a room by ID
exports.updateRoomById = async (req, res) => {
  try {
      const id = req.params.id;
      const updateData = req.body;
      // Update the room with the given ID
      // const updatedRoom = await Room.findByIdAndUpdate(id, updateData, { new: true });
      res.json({ message: "Room updated successfully" });
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
};

// Function to delete a room by ID
exports.deleteRoomById = async (req, res) => {
  try {
      const id = req.params.id;
      // Delete the room with the given ID
      // await Room.findByIdAndDelete(id);
      res.json({ message: "Room deleted successfully" });
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
};

