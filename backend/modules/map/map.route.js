import express from 'express';

import container from '../../core/middleware/awilix-container.js';

const router = express.Router();
const controllerHelper = container.resolve('controllerHelper');
const authHandler = container.resolve('authHandler');

router.get('/disaster/types',
  controllerHelper.invoke('getDisasterTypes', 'mapController'));
router.get('/disasters', controllerHelper.invoke('getAllDisaster', 'mapController'));
router.get('/disaster/:id',
  controllerHelper.invoke('getOneDisaster', 'mapController'));
router.post('/disaster',
  authHandler.verifyToken,
  controllerHelper.invoke('createDisaster', 'mapController'));
router.patch('/disaster/:id',
  authHandler.verifyToken,
  controllerHelper.invoke('editDisaster', 'mapController'));
router.delete('/disaster/:id',
  authHandler.verifyToken,
  controllerHelper.invoke('deleteDisaster', 'mapController'));

export default router;