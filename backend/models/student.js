const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Student extends Model {
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
      allowNull: false
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: true
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true
    },
    roomID: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Room', // This should match the model name, not the table name
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'Student'
  });

  return Student;
};
