import express from 'express';

import container from '../../core/middleware/awilix-container.js';

const router = express.Router();
const userController = container.resolve('userController');
const authHandler = container.resolve('authHandler');

router.get('/user', authHandler.verifyToken, userController.get);
router.post('/user/register', userController.register);
router.post('/user/auth', userController.signIn);
router.put('/user', authHandler.verifyToken, userController.edit);
router.delete('/user', authHandler.verifyToken, userController.delete);

export default router;