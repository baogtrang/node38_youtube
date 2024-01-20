import { Sequelize } from "sequelize";
import dbConfig from "../config/db.config.js";

let { dbHost, dbPort, dbUser, dbPass, dbDialect, dbName } = dbConfig;

const sequelize = new Sequelize(dbName, dbUser, dbPass, {
  host: dbHost,
  port: dbPort,
  dialect: dbDialect,
});

export default sequelize;
