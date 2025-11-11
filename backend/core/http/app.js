const express = require('express');
const errorHandler = require('../middleware/error-handler');
const userRoutes = require('../../modules/users/users.route');

const app = express();

app.use(express.json());
app.use(errorHandler);
app.use('/users', userRoutes);

module.exports = app;