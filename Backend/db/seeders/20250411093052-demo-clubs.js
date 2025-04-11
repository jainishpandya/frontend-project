'use strict';

export default {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('club', [
      {
        club_name: 'Helios Solutions Reading Club',
        club_contact_email: 'contact@bookworms.com',
        club_thumbnail_url: 'https://example.com/bookworms.jpg',
        club_location: 'New York',
        club_status: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        club_name: 'Marici Book Club',
        club_contact_email: 'hello@fictionaddicts.org',
        club_thumbnail_url: 'https://example.com/fictionaddicts.jpg',
        club_location: 'San Francisco',
        club_status: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        club_name: 'Swedish Book Lovers',
        club_contact_email: 'scifi@circle.net',
        club_thumbnail_url: 'https://example.com/scificircle.jpg',
        club_location: 'Sweden',
        club_status: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('club', null, {});
  }
};
