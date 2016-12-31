module.exports = function defineModel(sequelize, DataTypes) {
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

    // Files is an array of objects with the keys name and content
    files: {type: DataTypes.JSON, allowNull: false},

    // If status is success, output is the complete JavaScript file
    // that was generated
    // If status is failure, output is the error that occurred
    output: DataTypes.TEXT,

    // submission.lessonId can potentially be used to validate
    // that only the expected files are present for compilation
    // This property is added implicitly when we declare relationships
    // in index.js
  }, {
    timestamps: true,
    paranoid: true,
    createdAt: 'created',
    updatedAt: 'updated',
    deletedAt: 'deleted',
  });
};
