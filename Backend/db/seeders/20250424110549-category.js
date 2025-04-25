'use strict';

export default {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('category', [
      {
        id: 1,
        CategoryName: 'Fiction',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        CategoryName: 'Mystery & Thriller',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        CategoryName: 'Science Fiction',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 4,
        CategoryName: 'Self Help',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 5,
        CategoryName: 'Romance',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 6,
        CategoryName: 'Biography',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 7,
        CategoryName: 'History',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 8,
        CategoryName: 'Business',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('category', null, {});
  }
};