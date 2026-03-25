import express from 'express';

import container from '../../core/middleware/awilix-container.js';

const router = express.Router();
const controllerHelper = container.resolve('controllerHelper');
const containerHandler = container.resolve('containerHandler');
const authHandler = container.resolve('authHandler');

router.get('/supplies',
  controllerHelper.invoke('getAll', 'supplyController')
);
router.get('/supplies/unverified',
  containerHandler.useRedis,
  controllerHelper.invoke('getAll', 'supplyController')
); // redis

router.get('/supplies/me',
  authHandler.verifyToken,
  controllerHelper.invoke('getMine', 'supplyController')
);
router.get('/supplies/me/unverified',
  authHandler.verifyToken,
  containerHandler.useRedis,
  controllerHelper.invoke('getMine', 'supplyController')
); // redis

router.get('/supply/unverified/:id',
  containerHandler.useRedis,
  controllerHelper.invoke('getOne', 'supplyController')
); // redis
router.get('/supply/:id',
  controllerHelper.invoke('getMine', 'supplyController')
);

router.post('/supply',
  authHandler.verifyToken,
  containerHandler.useRedis,
  controllerHelper.invoke('create', 'supplyController')
); // redis
router.post('/supply/:id',
  authHandler.verifyToken,
  controllerHelper.invoke('create', 'supplyController')
);
router.post('/supply/:id/review',
  authHandler.verifyToken,
  containerHandler.useRedis,
  controllerHelper.invoke('create', 'supplyController')
); // redis

router.post('/supply/:id/proof',
  authHandler.verifyToken,
  controllerHelper.invoke('addProof', 'supplyController')
);

router.put('/supply/:id',
  authHandler.verifyToken,
  containerHandler.useRedis,
  controllerHelper.invoke('edit', 'supplyController')
); // redis

router.delete('/supply/:id',
  authHandler.verifyToken,
  containerHandler.useRedis,
  controllerHelper.invoke('delete', 'supplyController')
); // redis

export default router;