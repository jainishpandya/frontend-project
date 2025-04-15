// models/club_user.js

import { DataTypes } from 'sequelize';
import sequelize from '../../config/database.js';
import book from './book.js';

const clubuser = sequelize.define('clubuser', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
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
  modelName: 'clubuser',
});


clubuser.hasMany(book);
clubuser.hasMany(review);

export default clubuser;