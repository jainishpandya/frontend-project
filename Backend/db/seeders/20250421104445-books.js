'use strict';

export default {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('book', [
      {
        title: 'The Great Gatsby',
        author: 'F. Scott Fitzgerald',
        ISBN: 9780743273565,
        IsAvailable: true,
        clubID: 1,
        userID: 1,
        categoryId: 1,
        languageId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'To Kill a Mockingbird',
        author: 'Harper Lee',
        ISBN: 9780099549482,
        IsAvailable: true,
        clubID: 1,
        userID: 2,
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
        clubID: 2,
        userID: 3,
        categoryId: 2,
        languageId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: '1984',
        author: 'George Orwell',
        ISBN: 9788129116116,
        IsAvailable: true,
        clubID: 3,
        userID: 1,
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
        clubID: 2,
        userID: 2,
        categoryId: 4,
        languageId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'The Silent Patient',
        author: 'Alex Michaelides',
        ISBN: 9781250301697,
        IsAvailable: true,
        clubID: 1,
        userID: 3,
        categoryId: 2,
        languageId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Dune',
        author: 'Frank Herbert',
        ISBN: 9780441172719,
        IsAvailable: true,
        clubID: 2,
        userID: 1,
        categoryId: 3,
        languageId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'The Thursday Murder Club',
        author: 'Richard Osman',
        ISBN: 9780241425442,
        IsAvailable: false,
        clubID: 3,
        userID: 2,
        categoryId: 2,
        languageId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'The Midnight Library',
        author: 'Matt Haig',
        ISBN: 9780525559474,
        IsAvailable: true,
        clubID: 1,
        userID: 3,
        categoryId: 1,
        languageId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Project Hail Mary',
        author: 'Andy Weir',
        ISBN: 9780593135204,
        IsAvailable: true,
        clubID: 2,
        userID: 1,
        categoryId: 3,
        languageId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'The Seven Husbands of Evelyn Hugo',
        author: 'Taylor Jenkins Reid',
        ISBN: 9781501161933,
        IsAvailable: true,
        clubID: 3,
        userID: 2,
        categoryId: 1,
        languageId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Atomic Habits',
        author: 'James Clear',
        ISBN: 9780735211292,
        IsAvailable: true,
        clubID: 1,
        userID: 3,
        categoryId: 4,
        languageId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'The Psychology of Money',
        author: 'Morgan Housel',
        ISBN: 9780857197689,
        IsAvailable: false,
        clubID: 2,
        userID: 1,
        categoryId: 4,
        languageId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Norwegian Wood',
        author: 'Haruki Murakami',
        ISBN: 9780375704024,
        IsAvailable: true,
        clubID: 3,
        userID: 2,
        categoryId: 1,
        languageId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'The Book Thief',
        author: 'Markus Zusak',
        ISBN: 9780375842207,
        IsAvailable: true,
        clubID: 1,
        userID: 3,
        categoryId: 1,
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