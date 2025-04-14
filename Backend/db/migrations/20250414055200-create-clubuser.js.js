/* eslint-disable no-unused-vars */
/** @type {import('sequelize-cli').Migration} */
export default {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('club-user', {
      id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        user_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'user',
            key: 'id',
          },
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE',
        },
        club_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'club',
            key: 'id',
          },
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE',
        },
        role: {
          type: Sequelize.ENUM('0', '1','2'),
          allowNull: false,
          CASCADE : true,
        },
        createdAt: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          allowNull: false,
        },
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('club-user');
  }
};
