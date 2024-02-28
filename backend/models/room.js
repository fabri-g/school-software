const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Room extends Model {
    static associate(models) {
      // One-to-many relationship between Room and Student
      Room.hasMany(models.Student, {
        foreignKey: 'roomID',
        as: 'students' // Alias for the relation
      });
    }
  }

  Room.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    currentCapacity: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: true,
    },
    maximumCapacity: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    instructor: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'Room'
  });

  return Room;
};
