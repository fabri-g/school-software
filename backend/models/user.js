// models/user.js
'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
    // Mre fields here as needed
  }, {});
  User.associate = function(models) {
    // Other associations can be defined here
  };
  return User;
};
