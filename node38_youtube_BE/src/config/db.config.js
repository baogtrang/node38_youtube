/*
Loading environment variables from .env file into process.env
This file serves as a central place to gather all database configuration settings. 
It pulls values from process.env, which have been loaded by dotenv.
*/
import dotenv from "dotenv";
dotenv.config();

// DB configuration object
const dbConfig = {
  dbHost: process.env.DB_HOST,
  dbUser: process.env.DB_USERNAME,
  dbPass: process.env.DB_PASS,
  dbPort: process.env.DB_PORT,
  dbDialect: process.env.DB_DIALECT,
  dbName: process.env.DB_NAME,
};

// console.log(dbConfig);
// // testing by node src/config/db.config.js

export default dbConfig;
