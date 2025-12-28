import express from 'express';

import container from '../../core/di/unit-container.js';

const router = express.Router();
const unitController = container.resolve('unitController');

router.get('/units', unitController.getAll);

export default router;