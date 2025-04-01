import { Sequelize } from "sequelize";
import config from "./config.js";
import process from 'process';

const env = process.env.NODE_ENV || "development";

if (!config[env]) {
    throw new Error(`Config for environment "${env}" not found.`);
}

const sequelize = new Sequelize(config[env].database, config[env].username, config[env].password, {
    host: config[env].host,
    dialect: config[env].dialect
});

export default sequelize;
