import { createContainer, asClass, asValue } from 'awilix';

import db from '../models/index.js';
import UnitSqlRepository from '../../modules/unit/repository/unit.sql-repository.js';
import UnitFacadeService from '../../modules/unit/unit.facade-service.js';
import UnitGetAllService from '../../modules/unit/service/get/unit.get-all-service.js';
import UnitController from '../../modules/unit/unit.controller.js';

const container = createContainer();

container.register({
  container: asValue(container),

  ...Object.keys(db).reduce((acc, key) => {
    acc[key] = asValue(db[key]);
    return acc;
  }, {}),
  unitRepository: asClass(UnitSqlRepository).scoped(),
  unitFacade: asClass(UnitFacadeService).scoped(),
  unitGetAllService: asClass(UnitGetAllService).scoped(),
  unitController: asClass(UnitController).scoped()
});

export default container;