// This table represents user lesson progress
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('progress', {
    // The first time a user submits any lesson, this table gets
    // a record recording that they started the lesson
    // The score is initially zero which for lessons represents that
    // the lesson was attempted but unfinished
    // For quizzes, the score represents the number of questions
    // they got right out of a maximum score listed in the
    // lesson table
    score: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 0,
      },
    },
  }, {
    // we do not want sequelize to pluralize this name
    freezeTableName: true,
    timestamps: true,
    paranoid: true,
    createdAt: 'created',
    updatedAt: 'updated',
    deletedAt: 'deleted',
  });
};
