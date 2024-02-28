const { sequelize, Student, Room, Sibling } = require ('../models');
const { Op } = require('sequelize');

// Function to get all students
exports.getAllStudents = async (req, res, next) => {
  try {
    const { name } = req.query;
    let options = {
      include: [{model: Room, as: 'room'}, { model: Student, as: 'Siblings'}]
    };

    if (name) {
      options.where = {
        name : {
        [Op.iLike]: `%${name}%`
        }
      };
    }

    const students = await Student.findAll(options);
    res.json(students);
  } catch (error) {
    console.error('Error fetching students:', error);
    next(error);
  }
};

// Function to get a single student by ID
exports.getStudentById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const student = await Student.findByPk(id, {
      include: [
        {model: Room, as: 'room'},
        { model: Student, as: 'Siblings', include: [{ model: Room, as: 'room' }] }
      ]
    });
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    } else {
      res.json(student);
    }
  } catch (error) {
    console.error("Error fetching student:", error);
    next(error);
  }
};

// Function to create a new student
exports.createStudent = async (req, res, next) => {
  try {
    const { name, age, gender, address, roomID, siblingIds } = req.body;
    // Create the new student
    const newStudent = await Student.create({ name, age, gender, address, roomID });
    // If there are sibling IDs provided, create those relationships

    if (siblingIds && siblingIds.length > 0) {
      const siblingRelations = [];
      siblingIds.forEach(siblingId => {
        siblingRelations.push({ studentId: newStudent.id, siblingId });
        siblingRelations.push({ studentId: siblingId, siblingId: newStudent.id });
      });
      await Sibling.bulkCreate(siblingRelations, { ignoreDuplicates: true });
    }

    res.status(201).json(newStudent);
  } catch (error) {
    next(error);
  }
}

// Function to update a student by ID
exports.updateStudentById = async (req, res, next) => {
  const transaction = await sequelize.transaction();
  try {
    const id = req.params.id;
    const { name, age, gender, address, roomID, siblingIds } = req.body;
    // Update student details
    await Student.update({ name, age, gender, address, roomID }, { where: { id } });

    // Update sibling relationships
    // Remove existing siblings
    await Sibling.destroy({
      where: { [Op.or]: [{ studentId: id }, { siblingId: id }] }
    }, { transaction });

    // Ensure symmetric sibling relationships
    if (siblingIds && siblingIds.length > 0) {
      const siblingRelations = siblingIds.flatMap(siblingId => [
        { studentId: id, siblingId },
        { studentId: siblingId, siblingId: id }
      ]);
      await Sibling.bulkCreate(siblingRelations, { transaction });
    }
    await transaction.commit();

    const updatedStudent = await Student.findByPk(id, {
      include: [
        { model: Room, as: 'room' },
        { model: Student, as: 'Siblings' }
      ]
    });

    res.json(updatedStudent);
  } catch (error) {
    await transaction.rollback();
    next(error);
  }
}

// Function to delete a student by ID
exports.deleteStudentById= async (req, res, next) =>{
  try {
    const id = req.params.id;
    const deleted = await Student.destroy({ where: { id } });

    if (deleted) {
      res.status(200).json({ message: "Student deleted successfully" });
    } else {
      res.status(404).json({ message: "Student not found" });
    }
  } catch (error) {
    next(error);
  }
}
