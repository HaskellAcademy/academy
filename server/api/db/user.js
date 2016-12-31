module.exports = function defineModel(sequelize, DataTypes) {
  return sequelize.define('user', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: DataTypes.TEXT,
    email: {
      type: DataTypes.TEXT,
      validate: {isEmail: true},
    },
    lastLogin: DataTypes.DATE,
    // If isActive is false for a user, they cannot login
    // Their account is disabled
    isActive: DataTypes.BOOLEAN,
    // notes is an admin-only field that only shows up in the
    // admin interface and is designed to provide a place to
    // add notes about certain (usually misbehaving) users
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
