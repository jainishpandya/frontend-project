'use strict'
import { Model, sequelize, DataTypes } from 'sequelize';
import sequelize from '../../config/database.js';
import clubuser from './clubuser.js';
import category from './category.js';
import language from './language.js';

const book = sequelize.define('book', {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    title: {
        type: DataTypes.STRING
    },
    Author: {
        type: DataTypes.STRING
    },
    ISBN: {
        type: DataTypes.INTEGER
    },
    IsAvailable: {
        type: DataTypes.BOOLEAN
    },
    clubuserId: {
        type: DataTypes.INTEGER,
        REFERENCES: {
            model: clubuser,
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    },
    categoryId: {
        type: DataTypes.INTEGER,
        REFERENCES: {
            model: category,
            key: 'id'
        }
    },
    languageId: {
        type: DataTypes.INTEGER,
        references: {
            model: language,
            key: 'id'
        }
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
});

book.belongsTo(clubuser, {foreignKey: 'clubuserId'});
book.hasMany(category, {foreignKey: 'categoryId'});
book.hasMany(language, {foreignKey: 'languageId'});

export default book;
