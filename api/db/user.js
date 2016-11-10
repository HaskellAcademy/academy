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
    lastLogin: DataTypes.DATE,
    isActive: DataTypes.BOOLEAN,
    notes: DataTypes.TEXT,
    role: {
      type: DataTypes.ENUM,
      values: ['user', 'admin', 'superadmin'],
      defaultValue: 'user',
    },
    googleId: DataTypes.TEXT,
    twitterId: DataTypes.TEXT,
    githubId: DataTypes.TEXT,
  }, {
    timestamps: true,
    paranoid: true,
    createdAt: 'created',
    updatedAt: 'updated',
    deletedAt: 'deleted',
  });
};
