const { Room, Student } = require('../models');
const { Op } = require('sequelize');

// Function to get all rooms
exports.getAllRooms = async (req, res, next) => {
    try {
      const { name } = req.query;
      let options = {};

      if (name) {
        options.where = {
          name : {
          [Op.iLike]: `%${name}%`
          }
        };
      }

      const rooms = await Room.findAll(options);
      res.json(rooms);
    } catch (error) {
        console.error('Error fetching rooms:', error);
        next(error);
    }
};

// Function to get a single room by ID, including all students
exports.getRoomById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const room = await Room.findByPk(id, {
      include: [{
        model: Student,
        as: 'students',
        attributes: ['id', 'name', 'age', 'gender', 'address'] // You can adjust the attributes as needed
      }]
    });

    if (room) {
      res.json(room);
    } else {
      res.status(404).json({ message: "Room not found" });
    }
  } catch (error) {
    next(error);
  }
};

// Function to create a new room
exports.createRoom = async (req, res, next) => {
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
        next(error);
    }
};

// Function to update a room by ID
exports.updateRoomById = async (req, res, next) => {
    try {
        const id = req.params.id;
        const updateData = req.body;
        const [updated] = await Room.update(updateData, { where: { id } });
        if (updated) {
            const updatedRoom = await Room.findByPk(id);
            res.status(200).json(updatedRoom);
        } else {
            res.status(404).json({ message: "Room not found" });
        }
    } catch (error) {
        next(error);
    }
};

// Function to delete a room by ID
exports.deleteRoomById = async (req, res, next) => {
    try {
        const id = req.params.id;
        const deleted = await Room.destroy({ where: { id } });
        if (deleted) {
            res.status(200).json({ message: "Room deleted successfully" });
        } else {
            res.status(404).json({ message: "Room not found" });
        }
    } catch (error) {
        next(error);
    }
};
