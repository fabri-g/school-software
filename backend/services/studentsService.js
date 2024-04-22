// services/studentsService.js
const { sequelize, Student, Room, Sibling } = require('../models');
const { Op } = require('sequelize');

// Get all students, optionally filtering by name
async function fetchAllStudents(name) {
  let options = {
    include: [{ model: Room, as: 'room' }, { model: Student, as: 'Siblings' }]
  };
  if (name) {
    options.where = { name: { [Op.iLike]: `%${name}%` } };
  }
  return Student.findAll(options);
}

// Get a single student by ID
async function fetchStudentById(id) {
  return Student.findByPk(id, {
    include: [
      { model: Room, as: 'room' },
      { model: Student, as: 'Siblings', include: [{ model: Room, as: 'room' }] }
    ]
  });
}

// Create a new student
async function createNewStudent(data) {
  const newStudent = await Student.create(data);

  if (data.siblingIds && data.siblingIds.length > 0) {
    const siblingRelations = data.siblingIds.flatMap(siblingId => [
      { studentId: newStudent.id, siblingId },
      { studentId: siblingId, siblingId: newStudent.id }
    ]);
    await Sibling.bulkCreate(siblingRelations, { ignoreDuplicates: true });
  }

  return newStudent;
}

// Update a student by ID
async function updateStudentById(id, updateData) {
  await sequelize.transaction(async (transaction) => {
    await Student.update(updateData, { where: { id } });

    await Sibling.destroy({
      where: { [Op.or]: [{ studentId: id }, { siblingId: id }] },
      transaction
    });

    if (updateData.siblingIds && updateData.siblingIds.length > 0) {
      const siblingRelations = updateData.siblingIds.flatMap(siblingId => [
        { studentId: id, siblingId },
        { studentId: siblingId, siblingId: id }
      ]);
      await Sibling.bulkCreate(siblingRelations, { transaction });
    }
  });

  return fetchStudentById(id); // Re-fetch to get updated details
}

// Delete a student by ID
async function deleteStudentById(id) {
  const deleted = await Student.destroy({ where: { id } });
  if (!deleted) {
    throw new Error("Student not found");
  }
  return deleted;
}

module.exports = {
  fetchAllStudents,
  fetchStudentById,
  createNewStudent,
  updateStudentById,
  deleteStudentById
};
