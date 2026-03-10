import { createContainer, asClass, asValue } from 'awilix';

import db from '../models/index.js';
import CategorySqlRepository from '../../modules/category/repository/category.sql-repository.js';
import CategoryFacadeService from '../../modules/category/category.facade-service.js';
import CategoryGetAllService from '../../modules/category/service/get/category.get-all-service.js';
import CategoryController from '../../modules/category/category.controller.js';
import JwtService from './jwt-service.js';
import SupplySqlRepository from '../../modules/supply/repository/supply.sql-repository.js';
import SupplyFacadeService from '../../modules/supply/supply.facade-service.js';
import SupplyGetAllService from '../../modules/supply/service/get/supply.get-all-service.js';
import SupplyCreateService from '../../modules/supply/service/create/supply.create-service.js';
import SupplyEditService from '../../modules/supply/service/edit/supply.edit-service.js';
import SupplyDeleteService from '../../modules/supply/service/delete/supply.delete-service.js';
import SupplyController from '../../modules/supply/supply.controller.js';
import UnitSqlRepository from '../../modules/unit/repository/unit.sql-repository.js';
import UnitFacadeService from '../../modules/unit/unit.facade-service.js';
import UnitGetAllService from '../../modules/unit/service/get/unit.get-all-service.js';
import UnitController from '../../modules/unit/unit.controller.js';
import UserSqlRepository from '../../modules/users/repository/users.sql-repository.js';
import UserFacadeService from '../../modules/users/users.facade-service.js';
import UserRegisterJwtService from '../../modules/users/service/register/users.register-jwt-service.js';
import UserSignInJwtService from '../../modules/users/service/signin/users.signin-jwt-service.js';
import UserEditService from '../../modules/users/service/edit/users.edit-service.js';
import UserAdminEditService from '../../modules/users/service/edit/users.admin-edit-service.js';
import UserDeleteService from '../../modules/users/service/delete/users.delete-service.js';
import UserAdminDeleteService from '../../modules/users/service/delete/users.admin-delete-service.js';
import UserController from '../../modules/users/users.controller.js';

const container = createContainer();

container.register({
  container: asValue(container),

  ...Object.keys(db).reduce((acc, key) => {
    acc[key] = asValue(db[key]);
    return acc;
  }, {}),
  categoryRepository: asClass(CategorySqlRepository).scoped(),
  categoryFacade: asClass(CategoryFacadeService).scoped(),
  categoryGetAllService: asClass(CategoryGetAllService).scoped(),
  categoryController: asClass(CategoryController).scoped(),

  jwtService: asClass(JwtService).scoped(),

  supplyRepository: asClass(SupplySqlRepository).scoped(),
  supplyFacade: asClass(SupplyFacadeService).scoped(),
  supplyGetAllService: asClass(SupplyGetAllService).scoped(),
  supplyCreateService: asClass(SupplyCreateService).scoped(),
  supplyEditService: asClass(SupplyEditService).scoped(),
  supplyDeleteService: asClass(SupplyDeleteService).scoped(),
  supplyController: asClass(SupplyController).scoped(),

  unitRepository: asClass(UnitSqlRepository).scoped(),
  unitFacade: asClass(UnitFacadeService).scoped(),
  unitGetAllService: asClass(UnitGetAllService).scoped(),
  unitController: asClass(UnitController).scoped(),

  userRepository: asClass(UserSqlRepository).scoped(),
  userFacade: asClass(UserFacadeService).scoped(),
  userRegisterJwtService: asClass(UserRegisterJwtService).scoped(),
  userSignInJwtService: asClass(UserSignInJwtService).scoped(),
  userEditService: asClass(UserEditService).scoped(),
  userAdminEditService: asClass(UserAdminEditService).scoped(),
  userDeleteService: asClass(UserDeleteService).scoped(),
  userAdminDeleteService: asClass(UserAdminDeleteService).scoped(),
  userController: asClass(UserController).scoped()

});

export default container;