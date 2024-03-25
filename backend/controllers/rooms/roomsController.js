const { fetchRooms, fetchRoomById, createNewRoom, updateRoomById, deleteRoomById } = require('../../services/roomsService');

// Function to get all rooms
async function getAllRooms(req, res, next) {
  const { name } = req.query;
  try {
    const response = await fetchRooms(name);
    res.json(response);
  } catch (error) {
      console.error('Error fetching rooms:', error);
      next(error);
  }
};

// Function to get a single room by ID, including all students
async function getRoomById(req, res, next) {
  const id = req.params.id;
  try {
    const response = await fetchRoomById(id);
    if (response) {
      res.json(response);
    } else {
      res.status(404).json({ message: "Room not found" });
    }
  } catch (error) {
    next(error);
  }
};

// Function to create a new room
async function createRoom(req, res, next) {
  const roomData = req.body;
  try {
    const newRoom = await createNewRoom(roomData);
    res.status(201).json(newRoom);
  } catch (error) {
      next(error);
  }
};

// Function to update a room by ID
async function updateRoom(req, res, next) {
  const id = req.params.id;
  const updateData = req.body;
  try {
    const updatedRoom = await updateRoomById(id, updateData);
    res.status(200).json(updatedRoom);

  } catch (error) {
    if (error.message === "Room not found") {
      res.status(404).json({ message: error.message });
    } else {
      next(error);
    }
  }
};

// Function to delete a room by ID
async function deleteRoom(req, res, next) {
  const id = req.params.id;
  try {
    await deleteRoomById(id);
    res.status(200).json({ message: "Room deleted successfully" });
  } catch (error) {
    if (error.message === "Room not found") {
      res.status(404).json({ message: error.message });
    } else {
      next(error);
    }
  }
};

module.exports = {
  getAllRooms,
  getRoomById,
  createRoom,
  updateRoom,
  deleteRoom
};
