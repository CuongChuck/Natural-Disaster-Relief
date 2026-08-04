import express from 'express';

import container from '../../core/middleware/awilix-container.js';

const router = express.Router();
const controllerHelper = container.resolve('controllerHelper');

router.get('/categories', controllerHelper.invoke('getAll', 'categoryController'));

export default router;