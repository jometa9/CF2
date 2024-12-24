const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const User = sequelize.define('User', {
  walletAddress: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  signature: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  timestamps: true,
});

module.exports = User;
