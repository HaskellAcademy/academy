module.exports = function(sequelize, DataTypes) {
  return sequelize.define('progress', {
    score: {type: DataTypes.INTEGER, allowNull: false},
  }, {
    timestamps: true,
    paranoid: true,
    createdAt: 'created',
    updatedAt: 'updated',
    deletedAt: 'deleted',
  });
};
