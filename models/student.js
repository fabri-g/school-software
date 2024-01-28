const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Student extends Model {
    static associate(models) {
      // Define associations here
      // Example: Student.belongsTo(models.Room);
    }
  }

  Student.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false
    },
    roomID: {
      type: DataTypes.INTEGER,
      allowNull: true, // assuming a student might not always be assigned to a room
      references: {
        model: 'Rooms', // 'Rooms' refers to the table name
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'Student'
  });

  return Student;
};
