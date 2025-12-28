import { createContainer, asClass, asValue } from 'awilix';

import db from '../models/index.js';
import SupplySqlRepository from '../../modules/supply/repository/supply.sql-repository.js';
import SupplyFacadeService from '../../modules/supply/supply.facade-service.js';
import SupplyGetAllService from '../../modules/supply/service/get/supply.get-all-service.js';
import SupplyCreateService from '../../modules/supply/service/create/supply.create-service.js';
import SupplyEditService from '../../modules/supply/service/edit/supply.edit-service.js';
import SupplyDeleteService from '../../modules/supply/service/delete/supply.delete-service.js';
import SupplyController from '../../modules/supply/supply.controller.js';

const container = createContainer();

container.register({
  container: asValue(container),

  ...Object.keys(db).reduce((acc, key) => {
    acc[key] = asValue(db[key]);
    return acc;
  }, {}),
  supplyRepository: asClass(SupplySqlRepository).scoped(),
  supplyFacade: asClass(SupplyFacadeService).scoped(),
  supplyGetAllService: asClass(SupplyGetAllService).scoped(),
  supplyCreateService: asClass(SupplyCreateService).scoped(),
  supplyEditService: asClass(SupplyEditService).scoped(),
  supplyDeleteService: asClass(SupplyDeleteService).scoped(),
  supplyController: asClass(SupplyController).scoped()
});

export default container;