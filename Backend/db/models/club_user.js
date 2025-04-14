// models/club_user.js

import { DataTypes } from 'sequelize';
import sequelize from '../../config/database.js';

const club_user = sequelize.define('club_user', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'user',
      key: 'id',
    },
  },
  club_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'club',
      key: 'id',
    },
  },
  role: {
    type: DataTypes.ENUM('0','1','2'),
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },
}, {
  freezeTableName: true,
  modelName: 'club_user',
});

export default club_user;
