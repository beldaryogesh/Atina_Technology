const {Sequelize, DataTypes} = require('sequelize');
const sequelize = require('../config/db');
const User = require('./userModel');

const Contact = sequelize.define('Contact', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  fullname: {
    type: DataTypes.STRING,
  },
  address: {
    type: DataTypes.STRING,
  },
  contactno: {
    type: DataTypes.STRING,
  },
  zip: {
    type: DataTypes.STRING,
  },
  email: {
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
  created_by: {
    type: DataTypes.INTEGER, 
    allowNull: false,
  },
});

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

module.exports = Contact;