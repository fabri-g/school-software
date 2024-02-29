require('dotenv').config();

module.exports = {
  "development": {
    "username": "postgres",
    "password": process.env.DEV_DB_PASSWORD,
    "database": "school_database_development",
    "host": "127.0.0.1",
    "dialect": "postgres",
    "port": 5432
  },
  "test": {
    "username": "postgres",
    "password": process.env.TEST_DB_PASSWORD,
    "database": "school_database_test",
    "host": "127.0.0.1",
    "dialect": "postgres",
    "port": 5432
  },
  "production": {
    "username": process.env.DB_USERNAME,
    "password": process.env.PROD_DB_PASSWORD,
    "database": process.env.PROD_DB_NAME,
    "host": process.env.DB_HOST,
    "dialect": "postgres",
    "port": process.env.DB_PORT
  }
};
