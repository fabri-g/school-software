module.exports = (sequelize, DataTypes) => {
  const Sibling = sequelize.define('Sibling', {
    studentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Student',
        key: 'id',
      }
    },
    siblingId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Student',
        key: 'id',
      }
    }
  }, {
    sequelize,
    modelName: 'Sibling',
    timestamps: true,
    indexes: [{
      unique: true,
      fields: ['studentId', 'siblingId']
    }],
    validate: {
      notSameStudent() {
        if (this.studentId === this.siblingId) {
          throw new Error("A student cannot be their own sibling.");
        }
      }
    }
  });

  return Sibling;
};
