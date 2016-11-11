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
