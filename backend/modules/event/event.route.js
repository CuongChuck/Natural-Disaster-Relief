import express from 'express';

import container from '../../core/middleware/awilix-container.js';

const router = express.Router();
const controllerHelper = container.resolve('controllerHelper');
const authHandler = container.resolve('authHandler');

router.get('/events/names',
  controllerHelper.invoke('getNames', 'eventController'));
router.get('/events', controllerHelper.invoke('getAll', 'eventController'));
router.get('/event/:id',
  controllerHelper.invoke('getOne', 'eventController'));
router.post('/event',
  authHandler.verifyToken,
  controllerHelper.invoke('create', 'eventController'));

export default router;