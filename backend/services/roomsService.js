// services/roomsService.js

const { sequelize, Student, Room, Sibling } = require ('../models');
const { Op } = require('sequelize');

async function fetchRooms (name) {
  let options = {};
  if (name) {
    options.where = {
      name : {
        [Op.iLike]: `%${name}%`
      }
    };
  }
  return Room.findAll(options);
}

async function fetchRoomById (id) {
  return Room.findByPk(id, {
    include: [{
      model: Student,
      as: 'students',
      attributes: ['id', 'name', 'age', 'gender', 'address']
    }]
  });
}

async function createNewRoom (roomData) {
  return Room.create(roomData);
}

async function updateRoomById (id, updateData) {
  const [updated] = await Room.update(updateData, { where: { id } });
  if (!updated) {
    throw new Error("Room not found");
  }
  return Room.findByPk(id);
}

async function deleteRoomById (id) {
  const deleted = await Room.destroy({ where: { id } });
  if (!deleted) {
    throw new Error("Room not found");
  }
  return deleted;
}

module.exports = {
  fetchRooms,
  fetchRoomById,
  createNewRoom,
  updateRoomById,
  deleteRoomById
};
