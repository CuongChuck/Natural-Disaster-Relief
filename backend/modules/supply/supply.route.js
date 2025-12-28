import express from 'express';

import container from '../../core/di/supply-container.js';

const router = express.Router();
const supplyController = container.resolve('supplyController');

router.get('/supplies', supplyController.getAll);
router.post('/supply', supplyController.create);
router.put('/supply/:id', supplyController.edit);
router.delete('/supply/:id', supplyController.delete);

export default router;