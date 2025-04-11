'use strict';

/** @type {import('sequelize-cli').Migration} */
export default migration {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('club_User', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      UserID: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',  // Make sure this matches your actual Users table name
          key: 'id'
        }
      },
      ClubID: {
        type: Sequelize.INTEGER,
        references: {
          model: 'club',  // Using 'club' to match your existing table name from the sample
          key: 'id'
        }
      },
      Role: {
        type: Sequelize.ENUM('member', 'admin', 'moderator')  // Define your enum values as needed
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      deletedAt: {
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('club_User');
  }
};

