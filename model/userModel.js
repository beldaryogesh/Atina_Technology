const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Contact = require('./contactModel');

const User = sequelize.define('User', {
  firstname: {
    type: DataTypes.STRING,
  },
  lastname: {
    type: DataTypes.STRING,
  },
  username: {
    type: DataTypes.STRING,
  },
  email: {
    type: DataTypes.STRING,
  },
  password: {
    type: DataTypes.STRING,
  },
  phone: {
    type: DataTypes.STRING, 
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});


const TokenBlacklist = sequelize.define('TokenBlacklist', {
  token: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

User.hasMany(TokenBlacklist);

// Contact.belongsTo(User, {
//   foreignKey: {
//     name: 'created_by',
//     allowNull: false,
//   },
//   targetKey: 'id',
// });

// User.hasMany(Contact, {
//   foreignKey: 'created_by',
//   sourceKey: 'id',
// });

module.exports = {
  User,
  TokenBlacklist
}; 


