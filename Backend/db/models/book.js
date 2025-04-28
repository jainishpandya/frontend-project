'use strict'
import { Model, Sequelize, DataTypes } from 'sequelize';
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
    author: {
        type: DataTypes.STRING
    },
    ISBN: {
        type: DataTypes.BIGINT
    },
    IsAvailable: {
        type: DataTypes.BOOLEAN
    },
    clubId:{
        type: DataTypes.INTEGER,
        references: {
            model: 'club',
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    },
    userId:{
        type: DataTypes.INTEGER,
        references: {
            model: 'user',
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    },
    categoryId: {
        type: DataTypes.INTEGER,
        REFERENCES: {
            model: 'category',
            key: 'id'
        }
    },
    languageId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'language',
            key: 'id'
        }
    },
    locationId:{
        type: DataTypes.INTEGER,
        references:{
            model: 'location',
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
    },

},
    {
        tableName: 'book',
        timestamps: true
    }

);


export default book;
