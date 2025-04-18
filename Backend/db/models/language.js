/* eslint-disable no-unused-vars */
'use strict';
import {Model, Sequelize, DataTypes } from 'sequelize';
import sequelize from '../../config/database.js';
import book from './book.js';


const language = sequelize.define('language',{
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGERconsole.log('Language model defined');
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

language.associate = function(models) {
  // associations can be defined here
  language.hasMany(models.book, {foreignKey: 'languageId'});
}

export default language;
