import { createContainer, asClass, asValue } from 'awilix';

import db from '../models/index.js';
import CategorySqlRepository from '../../modules/category/repository/category.sql-repository.js';
import CategoryFacadeService from '../../modules/category/category.facade-service.js';
import CategoryGetService from '../../modules/category/service/get/category.get-service.js';
import CategoryController from '../../modules/category/category.controller.js';

const container = createContainer();

container.register({
  container: asValue(container),

  ...Object.keys(db).reduce((acc, key) => {
    acc[key] = asValue(db[key]);
    return acc;
  }, {}),
  categoryRepository: asClass(CategorySqlRepository).scoped(),
  categoryFacade: asClass(CategoryFacadeService).scoped(),
  getAllStrategy: asClass(CategoryGetService).scoped(),
  categoryController: asClass(CategoryController).scoped()
});

export default container;