'use strict';
import {Model, Sequelize, DataTypes } from 'sequelize';
import sequelize from '../../config/database.js';


const category = sequelize.define('category',{
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  CategoryName: {
    type: DataTypes.STRING
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
  modelName: 'category',
  
});

category.belongsToMany(book);

export default category;
