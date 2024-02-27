const { Sequelize, Student, Room, Sibling } = require ('../models');
const { Op } = require('sequelize');

// Function to get all students
exports.getAllStudents = async (req, res, next) => {
  try {
    const { name } = req.query;
    let options = {
      include: [{model: Room, as: 'room'}]
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
      include: [{model: Room, as: 'room'}]
    });
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    // Fetch sibling relationships where the student is either the studentId or siblingId"
    const siblingRelations = await Sibling.findAll({
        where: {
          [Sequelize.Op.or]: [{ studentId: id }, { siblingId: id }]
        }
      });

    // Extract sibling IDs excluding the current student's ID
    const siblingIds = siblingRelations.map(relation =>
      relation.studentId.toString() === id ? relation.siblingId : relation.studentId
    );
    // Fetch the sibling students
    const siblings = await Student.findAll({
      where: {
        id: siblingIds
      },
      include: [{ model: Room, as: 'room' }] // Assuming you also want the room info for siblings
    });

    // Add the siblings to the student object or return separately based on your preference
    const studentWithSiblings = { ...student.toJSON(), siblings };
    res.json(studentWithSiblings);

  } catch (error) {
    console.error("Error fetching student:", error);
    next(error);
  }
}

// Function to create a new student
exports.createStudent = async (req, res, next) => {
  try {
    const { name, age, gender, address, roomID, siblingIds } = req.body;
    // Create the new student
    const newStudent = await Student.create({
      name,
      age,
      gender,
      address,
      roomID
    });
    // If there are sibling IDs provided, create those relationships
    if (siblingIds && siblingIds.length > 0) {
      const siblingRelations = siblingIds.map(siblingId => ({
        studentId: newStudent.id,
        siblingId: siblingId
      }));
      await Sibling.bulkCreate(siblingRelations);
    }

    res.status(201).json(newStudent);
  } catch (error) {
    console.error('Error creating student:', error);
    res.status(500).json({ message: error.message });
  }
}

// Function to update a student by ID
exports.updateStudentById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const { name, age, gender, address, roomID, siblingIds } = req.body;
    // Update student details
    const updatedStudent = await Student.update({ name, age, gender, address, roomID }, { where: { id } });

    // Update sibling relationships
    // Remove existing siblings
    await Sibling.destroy({ where: { studentId: id } });
    await Sibling.destroy({ where: { siblingId: id } });

    // Add new siblings
    const siblingRelations = siblingIds.map(siblingId => {
      return { studentId: id, siblingId };
    });
    await Sibling.bulkCreate(siblingRelations);

    if (updatedStudent) {
      const studentWithSiblings = await Student.findByPk(id, { include: [{ model: Sibling }] });
      res.json(studentWithSiblings);
    } else {
      res.status(404).json({ message: "Student not found" });
    }
  } catch (error) {
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
