const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'postgres',
    logging: false,
  }
);

const connectToDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ DB connected successfully!');
  } catch (error) {
    console.error('❌ DB connection failed:', error.message);
    process.exit(1); // Stop the app if DB fails
  }
};

module.exports = { sequelize, connectToDB };
