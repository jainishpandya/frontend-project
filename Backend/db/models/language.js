'use strict';
import {Model, Sequelize, DataTypes } from 'sequelize';
import sequelize from '../../config/database.js';


const language = sequelize.define('language',{
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  LanguageName: {
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
  modelName: 'language',
  
});

language.belongsToMany(book);

export default language;
