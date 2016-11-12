const path = require('path');
const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  protocol: 'postgres',
  dialectOptions: {
    ssl: true,
  },
  define: {
    timestamps: false,
  },
});

exports.sync = sequelize.sync.bind(sequelize);

const importModel = (name) => (
  sequelize.import(path.join(__dirname, `${name}`))
);

const User = exports.User = importModel('user');
const Lesson = exports.Lesson = importModel('lesson');
const Progress = exports.Progress = importModel('progress');
const Submission = exports.Submission = importModel('submission');

User.belongsToMany(Lesson, {through: Progress});
Lesson.belongsToMany(User, {through: Progress});

User.hasOne(Submission);
Lesson.hasMany(Submission);
