module.exports = function(sequelize, DataTypes) {
  return sequelize.define('submission', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    status: {
      type: DataTypes.ENUM,
      values: ['received', 'pending', 'processing', 'success', 'failure'],
      defaultValue: 'received',
    },
    files: {type: DataTypes.JSON, allowNull: false},
    output: DataTypes.TEXT,
  }, {
    timestamps: true,
    paranoid: true,
    createdAt: 'created',
    updatedAt: 'updated',
    deletedAt: 'deleted',
  });
};
