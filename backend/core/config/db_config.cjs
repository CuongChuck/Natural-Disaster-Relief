const env = require('./env.js');

module.exports = {
  development: {
    username: env.DB_USER,
    password: env.DB_PASS,
    database: env.DB_NAME,
    host: env.DB_HOST,
    port: env.DB_PORT,
    dialect: "postgres",
    charset: "UTF8",
    collate: "unicode",
    seederStorage: "sequelize"
  },
  test: {
    username: "root",
    password: null,
    database: "NDRS_test",
    host: "127.0.0.1",
    dialect: "postgres",
    charset: "UTF8",
    collate: "unicode",
    seederStorage: "sequelize"
  },
  production: {
    username: "root",
    password: null,
    database: "NDRS_prod",
    host: "127.0.0.1",
    dialect: "postgres",
    charset: "UTF8",
    collate: "unicode"
  }
};