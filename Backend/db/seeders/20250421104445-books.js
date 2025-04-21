'use strict';

export default {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('book', [
      {
        title: 'The Great Gatsby',
        author: 'F. Scott Fitzgerald',
        ISBN: 9780743273565,
        IsAvailable: true,
        clubuserId: 1,
        categoryId: 1,
        languageId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'To Kill a Mockingbird',
        author: 'Harper Lee',
        ISBN: 9780446310789,
        IsAvailable: true,
        clubuserId: 1,
        categoryId: 1,
        languageId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'The Alchemist',
        author: 'Paulo Coelho',
        ISBN: 9780062315007,
        IsAvailable: false,
        clubuserId: 2,
        categoryId: 2,
        languageId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: '1984',
        author: 'George Orwell',
        ISBN: 9780451524935,
        IsAvailable: true,
        clubuserId: 3,
        categoryId: 3,
        languageId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Pride and Prejudice',
        author: 'Jane Austen',
        ISBN: 9780141439518,
        IsAvailable: true,
        clubuserId: 2,
        categoryId: 4,
        languageId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('book', null, {});
  }
};