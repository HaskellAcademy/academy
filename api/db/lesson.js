module.exports = function(sequelize, DataTypes) {
  return sequelize.define('lesson', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    index: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        // 0 is the start lesson
        min: 0,
      },
    },
    title: {type: DataTypes.TEXT, allowNull: false},
    sectionTitle: {type: DataTypes.TEXT, allowNull: false},

    type: {
      type: DataTypes.ENUM,
      values: ['lesson', 'quiz'],
      allowNull: false,
    },

    // The hidden status exists because sometimes we don't
    // want to show a lesson but we don't want to delete
    // the user's progress associated with that lesson
    status: {
      type: DataTypes.ENUM,
      values: ['active', 'disabled', 'hidden'],
      defaultValue: 'active',
    },

    summary: {type: DataTypes.TEXT, defaultValue: ''},

    // The data field is an opaque JSON object that is meant
    // to only be used as static, read-only data. It abstracts
    // over the differences between lessons and quizzes. The
    // field is generally not meant to be operated on by the
    // backend other than to send the entire contents to
    // the frontend.
    data: {type: DataTypes.JSON, allowNull: false},

    // Lessons have a maxScore of 1 which means they completed
    // the lesson successfully
    // Quizzes have a maxScore of the number of questions
    // in the quiz
    maxScore: {type: DataTypes.INTEGER, allowNull: false},

    // If expectedOutput is null, the user can immediately move on
    // from this lesson after their first submission
    // For lessons with type lesson the expectedOutput format is:
    // {"text": "1\n2\n3", "image": "base64 encoded image data url"}
    // For lessons with the type quiz the expectedOutput format is:
    // ["A", "AC"]
    // Note: For multiple-answer questions, the selected answers are concatenated.
    // So if A and C are the answers, the answer in the expectedOutput is "AC"
    expectedOutput: DataTypes.JSONB,
  }, {
    timestamps: true,
    paranoid: true,
    createdAt: null,
    updatedAt: 'updated',
    deletedAt: 'deleted',
  });
};
