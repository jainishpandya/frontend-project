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
    clubId: {
        type: DataTypes.INTEGER,
        REFERENCES: {
            model: 'club',
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    },
    userId: {
        type: DataTypes.INTEGER,
        REFERENCES: {
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
        tableName:'book',
        timestamps: true
    }
    
);


// book.associate = function (models) {
//     // associations can be defined here
//     book.hasMany(models.review, { foreignKey: 'bookId' });
//     book.belongsTo(models.clubuser, { foreignKey: 'clubuserId' });
//     book.belongsTo(models.category, { foreignKey: 'categoryId' });
//     book.belongsTo(models.language, { foreignKey: 'languageId' });
// }

export default book;
