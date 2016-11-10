module.exports = function(sequelize, DataTypes) {
  return sequelize.define('user', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: DataTypes.TEXT,
    email: DataTypes.TEXT,
    photo: DataTypes.TEXT,
    googleId: DataTypes.TEXT,
  }, {
    timestamps: true,
    paranoid: true,
    createdAt: 'created',
    updatedAt: 'updated',
    deletedAt: 'deleted',
  });
};
