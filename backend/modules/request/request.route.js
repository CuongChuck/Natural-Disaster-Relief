import express from 'express';

import container from '../../core/middleware/awilix-container.js';

const router = express.Router();
const controllerHelper = container.resolve('controllerHelper');
const containerHandler = container.resolve('containerHandler');
const authHandler = container.resolve('authHandler');
const upload = container.resolve('multerUpload');
const imageUploader = container.resolve('imageUploader');

router.get('/requests',
  controllerHelper.invoke('getAll', 'requestController')
);
router.get('/request/status',
  controllerHelper.invoke('getStatus', 'requestController')
);
router.get('/requests/me',
  authHandler.verifyToken,
  controllerHelper.invoke('getMine', 'requestController')
);
router.get('/request/:id',
  controllerHelper.invoke('getOne', 'requestController')
);
router.get('/request/:id/review',
  controllerHelper.invoke('getReview', 'requestController')
);
router.post('/request',
  authHandler.verifyToken,
  controllerHelper.invoke('create', 'requestController')
);
router.patch('/request/:id',
  authHandler.verifyToken,
  containerHandler.acceptRequest,
  controllerHelper.invoke('accept', 'requestController')
);
router.post('/request/:id/review',
  authHandler.verifyToken,
  controllerHelper.invoke('review', 'requestController')
);
router.post('/request/:id/proof',
  authHandler.verifyToken,
  upload.single('image'),
  imageUploader.cloudinaryUpload('request'),
  controllerHelper.invoke('addProof', 'requestController')
);
router.put('/request/:id',
  authHandler.verifyToken,
  controllerHelper.invoke('edit', 'requestController')
);
router.delete('/request/:id',
  authHandler.verifyToken,
  controllerHelper.invoke('delete', 'requestController')
);

export default router;