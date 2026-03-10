const path = require('path');

require('dotenv').config({ path: path.resolve('../.env') });

module.exports = {
    development: {
        username: process.env.DEV_DB_USER,
        password: process.env.DEV_DB_PASS,
        database: process.env.DEV_DB_NAME,
        host: process.env.DEV_DB_HOST,
        dialect: "postgres",
        charset: "UTF8",
        collate: "unicode"
    },
    test: {
        username: "root",
        password: null,
        database: "NDRS_test",
        host: "127.0.0.1",
        dialect: "postgres",
        charset: "UTF8",
        collate: "unicode"
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