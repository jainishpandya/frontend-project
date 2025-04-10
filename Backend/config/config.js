import dotenv from 'dotenv'
dotenv.config({ path: `${process.cwd()}/.env` })

const config = {
  development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "postgres"
  },
  test: {
    password: null,
    database: "database_test",
    host: "127.0.0.1",
    dialect: "mysql"
  },
  production: {
    username: "root",
    password: null,
    database: "database_production",
    host: "127.0.0.1",
    dialect: "mysql"
  }
}

export default config;
// require('dotenv').config({ path: `${process.cwd()}/.env` });

// module.exports = {
//   development: {
//     username: process.env.DB_USERNAME,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_NAME,
//     host: process.env.DB_HOST,
//     port: process.env.DB_PORT,
//     dialect: "postgres"
//   },

//   test: {
//     username: process.env.DB_USERNAME || "postgres",
//     password: process.env.DB_PASSWORD || "1234",
//     database: process.env.DB_NAME || "bookcircle_test",
//     host: process.env.DB_HOST || "localhost",
//     port: process.env.DB_PORT || 5432,
//     dialect: "postgres"
//   },

//   production: {
//     username: process.env.DB_USERNAME || "postgres",
//     password: process.env.DB_PASSWORD || "1234",
//     database: process.env.DB_NAME || "bookcircle_prod",
//     host: process.env.DB_HOST || "localhost",
//     port: process.env.DB_PORT || 5432,
//     dialect: "postgres"
//   }
// };
