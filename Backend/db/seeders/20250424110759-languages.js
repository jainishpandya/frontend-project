'use strict';

export default {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('language', [
      {
        id: 1,
        LanguageName: 'English',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        LanguageName: 'Spanish',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        LanguageName: 'French',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 4,
        LanguageName: 'German',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 5,
        LanguageName: 'Japanese',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 6,
        LanguageName: 'Chinese',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('language', null, {});
  }
};