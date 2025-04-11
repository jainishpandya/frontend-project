'use strict';

export default {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('club_user', [
      // User 1 is ClubAdmin of Club 1
      {
        user_id: 1,
        club_id: 1,
        role: 'ClubAdmin',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // User 1 is also a regular User in the same club
      {
        user_id: 1,
        club_id: 1,
        role: 'User',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // User 2 is a User in Club 1
      {
        user_id: 2,
        club_id: 1,
        role: 'User',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // User 3 is a ClubAdmin in Club 2
      {
        user_id: 3,
        club_id: 2,
        role: 'ClubAdmin',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // User 4 is a User in Club 3
      {
        user_id: 4,
        club_id: 3,
        role: 'User',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // User 5 is a ClubAdmin in Club 3
      {
        user_id: 5,
        club_id: 3,
        role: 'ClubAdmin',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('club_user', null, {});
  }
};
