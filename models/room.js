const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Room extends Model {
    // You can define static methods or properties here if needed
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
    // other model options can go here
  });

  return Room;
};
