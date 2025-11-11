const express = require('express');

const container = require('../../core/di/user-container');

const router = express.Router();
const userController = container.resolve('userController');

router.post('/register', userController.register);
router.get('/auth', userController.signIn);
router.put('/edit', userController.edit);

module.exports = router;