import express from 'express';

import container from '../../core/middleware/awilix-container.js';

const router = express.Router();
const controllerHelper = container.resolve('controllerHelper');
const authHandler = container.resolve('authHandler');
const containerHandler = container.resolve('containerHandler');

router.get('/event/names',
  controllerHelper.invoke('getNames', 'eventController')
);
router.get('/events',
  controllerHelper.invoke('getAll', 'eventController')
);
router.get('/events/me',
  authHandler.verifyToken,
  controllerHelper.invoke('getMine', 'eventController')
);
router.get('/event/:id',
  controllerHelper.invoke('getOne', 'eventController')
);
router.post('/event/journey',
  authHandler.verifyToken,
  containerHandler.journey,
  controllerHelper.invoke('create', 'eventController')
);
router.patch('/event/journey/:id',
  authHandler.verifyToken,
  controllerHelper.invoke('edit', 'eventController')
);
router.post('/event/journey/:id',
  authHandler.verifyToken,
  containerHandler.completeJourney,
  containerHandler.updateSupplyStatus,
  controllerHelper.invoke('edit', 'eventController')
);
router.delete('/event/:id',
  authHandler.verifyToken,
  controllerHelper.invoke('delete', 'eventController')
);
export default router;