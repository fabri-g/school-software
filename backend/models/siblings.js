module.exports = (sequelize, DataTypes) => {
  const Sibling = sequelize.define('Sibling', {
    studentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Student', // This should match the model name, not the table name
        key: 'id',
      }
    },
    siblingId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Student', // Same as above
        key: 'id',
      }
    }
  }, {
    sequelize,
    modelName: 'Sibling',
    timestamps: true,
  });

  return Sibling;
};
