'use strict';

/** @type {import('sequelize-cli').Migration} */
export default {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('transaction', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      bookId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'book',
          key: 'id'
        },
        onUpdate: 'CASCADE',
      },
      LenderId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'user',
          key: 'id'
        },
        onUpdate: 'CASCADE'
      },
      BorrowerId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'user',
          key: 'id'
        },
        onUpdate: 'CASCADE'
      },
      ClubId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'club',
          key: 'id'
        },
        onUpdate: 'CASCADE'
      },
      status: {
        type: Sequelize.ENUM('1', '2', '3', '4', '5', '6'),
        allowNull: false,
      },
      RequestDate: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      pickupDate: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      cancelReason: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      returnDate: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      }
    });
    await queryInterface.addConstraint('transaction', {
      fields: ['bookId'],
      type: 'foreign key',
      name: 'fk_bookId',
      references: {
        table: 'book',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });
    await queryInterface.addConstraint('transaction', {
      fields: ['LenderId'],
      type: 'foreign key',
      name: 'fk_LenderId',
      references: {
        table: 'user',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });
    await queryInterface.addConstraint('transaction', {
      fields: ['BorrowerId'],
      type: 'foreign key',
      name: 'fk_BorrowerId',
      references: {
        table: 'user',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });
  },
 
  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('transaction');
  }
};
