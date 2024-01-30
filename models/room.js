const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Room extends Model {
    static associate(models) {
      // Define a one-to-many relationship between Room and Student
      Room.hasMany(models.Student, {
        foreignKey: 'roomID',
        as: 'students' // This alias is optional but can be useful in queries
      });
    }
  }

  Room.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    currentCapacity: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false
    },
    maximumCapacity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    instructor: {
      type: DataTypes.STRING
      // allowNull is true by default
    }
  }, {
    sequelize,
    modelName: 'Room'
  });

  return Room;
};
