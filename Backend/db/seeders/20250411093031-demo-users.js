'use strict';
import bcrypt from 'bcrypt';

export default {
  up: async (queryInterface, Sequelize) => {
    const saltRounds = 10;

    const users = [
      {
        name: 'One & Only Ekansh',
        email: 'ekansh@example.com',
        password: await bcrypt.hash('password1', saltRounds),
        userType: '1',
        phone_no: '1234567890',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Jainish Khan',
        email: 'jainu@example.com',
        password: await bcrypt.hash('password2', saltRounds),
        userType: '0',
        phone_no: '2345678901',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Suhani The OG Developer',
        email: 'charlie@example.com',
        password: await bcrypt.hash('password3', saltRounds),
        userType: '2',
        phone_no: '3456789012',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Rishi',
        email: 'rishi@example.com',
        password: await bcrypt.hash('password4', saltRounds),
        userType: '1',
        phone_no: '4567890123',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Khushbu',
        email: 'khushbu@example.com',
        password: await bcrypt.hash('password5', saltRounds),
        userType: '2',
        phone_no: '5678901234',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    await queryInterface.bulkInsert('user', users, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('user', null, {});
  }
};
