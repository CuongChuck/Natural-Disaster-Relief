import express from 'express';

import container from '../../core/di/category-container.js';

const router = express.Router();
const categoryController = container.resolve('categoryController');

router.get('/categories', categoryController.getAll);

export default router;