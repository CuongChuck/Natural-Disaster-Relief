import express from 'express';

import container from '../../core/middleware/awilix-container.js';

const router = express.Router();
const controllerHelper = container.resolve('controllerHelper');
const containerHandler = container.resolve('containerHandler');
const authHandler = container.resolve('authHandler');
const upload = container.resolve('multerUpload');
const imageUploader = container.resolve('imageUploader');
const inject = container.resolve('injection');

router.get('/supply/status',
  controllerHelper.invoke('getStatus', 'supplyController')
);

router.get('/supplies/all',
  controllerHelper.invoke('getAll', 'supplyController')
);
router.get('/supplies',
  inject.getVerified,
  controllerHelper.invoke('getAll', 'supplyController')
);
router.get('/supplies/unverified',
  inject.getAllUnverified,
  controllerHelper.invoke('getAll', 'supplyController')
);

router.get('/supplies/me/all',
  authHandler.verifyToken,
  controllerHelper.invoke('getMine', 'supplyController')
);
router.get('/supplies/me',
  authHandler.verifyToken,
  inject.getVerified,
  controllerHelper.invoke('getMine', 'supplyController')
);
router.get('/supplies/me/unverified',
  authHandler.verifyToken,
  inject.getMineUnverified,
  controllerHelper.invoke('getMine', 'supplyController')
);

router.get('/supply/:id',
  containerHandler.getSupplyByEvent,
  controllerHelper.invoke('getOne', 'supplyController')
);

router.get('/supply/:id/review',
  controllerHelper.invoke('getReview', 'supplyController')
);

router.post('/supply',
  authHandler.verifyToken,
  controllerHelper.invoke('create', 'supplyController')
);
router.post('/supply/:id',
  authHandler.verifyToken,
  containerHandler.accept,
  controllerHelper.invoke('accept', 'supplyController')
);

router.post('/supply/:id/review',
  authHandler.verifyToken,
  controllerHelper.invoke('review', 'supplyController')
);

router.post('/supply/:id/proof',
  authHandler.verifyToken,
  upload.single('image'),
  imageUploader.cloudinaryUpload('ndrs/supply'),
  controllerHelper.invoke('addProof', 'supplyController')
);

router.put('/supply/:id',
  authHandler.verifyToken,
  controllerHelper.invoke('edit', 'supplyController')
);

router.delete('/supply/:id',
  authHandler.verifyToken,
  controllerHelper.invoke('delete', 'supplyController')
);

export default router;