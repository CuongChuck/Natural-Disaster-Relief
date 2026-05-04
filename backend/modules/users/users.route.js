import express from 'express';

import container from '../../core/middleware/awilix-container.js';

const router = express.Router();
const controllerHelper = container.resolve('controllerHelper');
const authHandler = container.resolve('authHandler');
const inject = container.resolve('injection');

router.get('/user', authHandler.verifyToken, controllerHelper.invoke('get', 'userController'));
router.get('/users/volunteer',
	authHandler.verifyToken,
	inject.getVolunteers,
	controllerHelper.invoke('getMany', 'userController')
);
router.post('/user/register', controllerHelper.invoke('register', 'userController'));
router.post('/user/auth', controllerHelper.invoke('signIn', 'userController'));
router.put('/user', authHandler.verifyToken, controllerHelper.invoke('edit', 'userController'));
router.delete('/user', authHandler.verifyToken, controllerHelper.invoke('delete', 'userController'));

export default router;