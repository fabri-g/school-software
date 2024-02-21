const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Student extends Model {
    // One-to-many relationship between Room and Student
    static associate(models) {
      Student.belongsTo(models.Room, {
        foreignKey: 'roomID',
        as: 'room'
      });
    }
  }

  Student.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [5, 75] // Name length must be between this range
      }
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        isInt: true,
        min: 4,
        max: 80
      }
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isIn: [['Male', 'Female', 'Other']]
      }
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true
    },
    roomID: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Room',
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'Student'
  });

  return Student;
};
