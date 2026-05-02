import express from 'express';

import container from '../../core/middleware/awilix-container.js';

const router = express.Router();
const controllerHelper = container.resolve('controllerHelper');
const authHandler = container.resolve('authHandler');
const uploads = container.resolve('multerUploads');
const imageUploader = container.resolve('imageUploader');
const containerHandler = container.resolve('containerHandler');

router.get('/deliveries',
  controllerHelper.invoke('getAll', 'deliveryController')
);
router.get('/deliveries/me',
  authHandler.verifyToken,
  controllerHelper.invoke('getMine', 'deliveryController')
);
router.get('/delivery/:id',
  controllerHelper.invoke('getOne', 'deliveryController')
);
router.post('/delivery/:id/proof',
  authHandler.verifyToken,
  uploads([
    { name: 'receipt', maxCount: 1 },
    { name: 'proof', maxCount: 1 }
  ]),
  imageUploader.cloudinaryUploads({
    receipt: 'ndrs/delivery/receipt',
    proof: 'ndrs/delivery/proof'
  }),
  controllerHelper.invoke('edit', 'deliveryController')
);
router.post('/delivery/:id/operator',
  authHandler.verifyToken,
  containerHandler.assignOperator,
  controllerHelper.invoke('edit', 'deliveryController')
);

export default router;