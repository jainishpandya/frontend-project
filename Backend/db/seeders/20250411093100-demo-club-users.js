'use strict';

export default {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('clubuser', [
      // User 1 is ClubAdmin of Club 1
      {
        userId: 1,
        clubId: 1,
        role: '1',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // User 1 is also a regular User in the same club
      {
        userId: 2,
        clubId: 2,
        role: '0',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // User 2 is a User in Club 1
      {
        userId: 3,
        clubId: 3,
        role: '1',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // User 3 is a ClubAdmin in Club 2
      {
        userId: 4,
        clubId: 4,
        role: '2',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // User 4 is a User in Club 3
      {
        userId: 5,
        clubId: 5,
        role: '2',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // User 5 is a ClubAdmin in Club 3
      {
        userId: 6,
        clubId: 6,
        role: '1',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('clubuser', null, {});
  }
};
