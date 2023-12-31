require('dotenv').config();

module.exports = 
  {
    "development": {
      "username": process.env.DB_USER,
      "password": process.env.DB_PASSWORD,
      "database": process.env.DB_NAME,
      "host": process.env.DB_HOST,
      "dialect": "postgres"
    },
    "test": {
      "username": "root",
      "password": null,
      "database": "database_test",
      "host": "127.0.0.1",
      "dialect": "mysql"
    },
    "production": {
      "username": process.env.DB_PRODUCTION_USER,
      "password": process.env.DB_PRODUCTION_PASSWORD,
      "database": process.env.DB_PRODUCTION_NAME,
      "host": process.env.DB_PRODUCTION_HOST,
      "dialect": "postgres",
      "port": 5432,
      "dialectOptions": {
        "ssl": true        //<============ Add this
      }
    }
  }
  