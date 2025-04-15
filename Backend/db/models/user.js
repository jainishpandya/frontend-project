'use strict';
import { Model, Sequelize, DataTypes } from 'sequelize';
import sequelize from '../../config/database.js';
import clubuser from './clubuser.js';
import club from './club.js';

const user = sequelize.define('user',{
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  profile_image: {
    type: DataTypes.STRING
  },
  name: {
    type: DataTypes.STRING
  },
  email: {
    type: DataTypes.STRING
  },
  password: {
    type: DataTypes.STRING
  },
  phone_no: {
    type: DataTypes.STRING
  },
  setPasswordToken: {
    type: DataTypes.STRING
  },
  setPasswordTokenExpiry: {
    type: DataTypes.DATE
  },
  verificationToken: {
    type: DataTypes.STRING
  },
  verificationTokenExpiry: {
    type: DataTypes.DATE
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE
  },
  updatedAt: {
    allowNull: false,
    type: DataTypes.DATE
  },
  deletedAt: {
    type: DataTypes.DATE
  }
}, {
  paranoid: true,
  freezeTableName: true,
  modelName: 'user',
  
});

user.belongsToMany(club, {through: clubuser});
club.belongsToMany(user, {through: clubuser});

export default user;
