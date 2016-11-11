module.exports = function(sequelize, DataTypes) {
  return sequelize.define('lesson', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    index: {type: DataTypes.INTEGER, allowNull: false},
    title: {type: DataTypes.TEXT, allowNull: false},
    sectionTitle: {type: DataTypes.TEXT, allowNull: false},
    type: {
      type: DataTypes.ENUM,
      values: ['lesson', 'quiz'],
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM,
      values: ['active', 'disabled', 'hidden'],
      defaultValue: 'active',
    },
    summary: {type: DataTypes.TEXT, defaultValue: ''},
    data: {type: DataTypes.JSON, allowNull: false},
    maxScore: {type: DataTypes.INTEGER, allowNull: false},
    expectedOutput: DataTypes.JSONB,
  }, {
    timestamps: true,
    paranoid: true,
    createdAt: null,
    updatedAt: 'updated',
    deletedAt: 'deleted',
  });
};
