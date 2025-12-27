import express from 'express';

import container from '../../core/di/user-container.js';

const router = express.Router();
const userController = container.resolve('userController');

router.post('/user/register', userController.register);
router.get('/user/auth', userController.signIn);
router.put('/user/edit', userController.edit);
router.delete('/user/delete', userController.delete);

export default router;