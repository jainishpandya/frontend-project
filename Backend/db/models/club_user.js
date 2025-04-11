'use strict';
import { Model, DataTypes } from 'sequelize';
import sequelize from '../../config/database.js';

const club_user = sequelize.define('club_User', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  UserID: {
    type: DataTypes.INTEGER,
    references: {
      model: 'User',
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  },
  ClubID: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Club',
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  },
  Role: {
    type: DataTypes.ENUM
  },
  CreatedAt: {
    allowNull: false,
    type: DataTypes.DATE
  },
  UpdatedAt: {
    allowNull: false,
    type: DataTypes.DATE
  }
}, {
  paranoid: true,
  freezeTableName: true,
  modelName: 'club_user',
});

// Define associations
club_user.associate = (models) => {
  // BelongsTo associations
  club_user.belongsTo(models.User, {
    foreignKey: 'UserID',
    as: 'user'
  });
  
  club_user.belongsTo(models.Club, {
    foreignKey: 'ClubID',
    as: 'club'
  });
};

export default club_user;