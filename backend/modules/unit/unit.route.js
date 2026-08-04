import express from 'express';

import container from '../../core/middleware/awilix-container.js';

const router = express.Router();
const controllerHelper = container.resolve('controllerHelper');

router.get('/units', controllerHelper.invoke('getAll', 'unitController'));

export default router;