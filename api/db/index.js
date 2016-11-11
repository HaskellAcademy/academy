const path = require('path');
const Sequelize = require('sequelize');

const env = {}; //TODO

const sequelize = new Sequelize(env.DATABASE_URL, {
  dialect: 'postgres',
  protocol: 'postgres',
  dialectOptions: {
    ssl: true,
  },
  define: {
    timestamps: false,
  },
});

const importModel = (name) => (
  sequelize.import(path.join(__dirname, `${name}`))
);

export const User = importModel('user');
export const Lesson = importModel('lesson');
export const Progress = importModel('progress');

User.belongsToMany(Lesson, {through: Progress});
Lesson.belongsToMany(User, {through: Progress});
