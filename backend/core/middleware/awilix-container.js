import { createContainer, asClass, asValue, InjectionMode } from 'awilix';

import db from '../models/index.js';
import { client } from '../config/redis.js';
import JwtService from './jwt-service.js';
import ContainerHandler from './container-handler.js';
import ControllerHelper from './controller-helper.js';
import AuthHandler from './auth-handler.js';
import CategoryRedisRepository from '../../modules/category/repository/category.redis-repository.js';
import CategoryFacadeService from '../../modules/category/category.facade-service.js';
import CategoryGetAllService from '../../modules/category/service/get/category.get-all-service.js';
import CategoryGetOneService from '../../modules/category/service/get-one/category.get-one.js';
import CategoryController from '../../modules/category/category.controller.js';
import SupplySqlRepository from '../../modules/supply/repository/supply.sql-repository.js';
import SupplyFacadeService from '../../modules/supply/supply.facade-service.js';
import SupplyGetAllUnverified from '../../modules/supply/service/get-all/supply.get-all-unverified.js';
import SupplyGetMineUnverified from '../../modules/supply/service/get-mine/supply.get-mine-unverified.js';
import SupplyGetOneUnverified from '../../modules/supply/service/get-one/supply.get-one-unverified.js';
import SupplyCreateService from '../../modules/supply/service/create/supply.create-service.js';
import SupplyEditService from '../../modules/supply/service/edit/supply.edit-service.js';
import SupplyDeleteService from '../../modules/supply/service/delete/supply.delete-service.js';
import SupplyController from '../../modules/supply/supply.controller.js';
import UnitRedisRepository from '../../modules/unit/repository/unit.redis-repository.js';
import UnitFacadeService from '../../modules/unit/unit.facade-service.js';
import UnitGetAllService from '../../modules/unit/service/get/unit.get-all-service.js';
import UnitGetOneService from '../../modules/unit/service/get-one/unit.get-one.js';
import UnitController from '../../modules/unit/unit.controller.js';
import UserSqlRepository from '../../modules/users/repository/users.sql-repository.js';
import UserFacadeService from '../../modules/users/users.facade-service.js';
import UserGetService from '../../modules/users/service/get/users.get-service.js';
import UserGetMany from '../../modules/users/service/get-many/users.get-many.js';
import UserRegisterJwtService from '../../modules/users/service/register/users.register-jwt-service.js';
import UserSignInJwtService from '../../modules/users/service/signin/users.signin-jwt-service.js';
import UserEditService from '../../modules/users/service/edit/users.edit-service.js';
import UserAdminEditService from '../../modules/users/service/edit/users.admin-edit-service.js';
import UserDeleteService from '../../modules/users/service/delete/users.delete-service.js';
import UserAdminDeleteService from '../../modules/users/service/delete/users.admin-delete-service.js';
import UserController from '../../modules/users/users.controller.js';

const container = createContainer({
  injectionMode: InjectionMode.PROXY,
  strict: true
});

container.register({
  ...Object.keys(db).reduce((acc, key) => {
    acc[key] = asValue(db[key]);
    return acc;
  }, {}),
  categoryRepository: asClass(CategoryRedisRepository).singleton(),
  categoryFacade: asClass(CategoryFacadeService).singleton(),
  categoryGetAllService: asClass(CategoryGetAllService).singleton(),
  categoryGetOneService: asClass(CategoryGetOneService).singleton(),
  categoryController: asClass(CategoryController).singleton(),

  db: asValue(db),
  redisClient: asValue(client),
  jwtService: asClass(JwtService).singleton(),
  authHandler: asClass(AuthHandler).singleton(),
  containerHandler: asClass(ContainerHandler).singleton(),
  controllerHelper: asClass(ControllerHelper).singleton(),

  supplyRepository: asClass(SupplySqlRepository).scoped(),
  supplyFacade: asClass(SupplyFacadeService).scoped(),
  supplyGetAllService: asClass(SupplyGetAllUnverified).scoped(),
  supplyGetMineService: asClass(SupplyGetMineUnverified).scoped(),
  supplyGetOneService: asClass(SupplyGetOneUnverified).scoped(),
  supplyCreateService: asClass(SupplyCreateService).scoped(),
  supplyEditService: asClass(SupplyEditService).scoped(),
  supplyDeleteService: asClass(SupplyDeleteService).scoped(),
  supplyController: asClass(SupplyController).scoped(),

  unitRepository: asClass(UnitRedisRepository).singleton(),
  unitFacade: asClass(UnitFacadeService).singleton(),
  unitGetAllService: asClass(UnitGetAllService).singleton(),
  unitGetOneService: asClass(UnitGetOneService).singleton(),
  unitController: asClass(UnitController).singleton(),

  userRepository: asClass(UserSqlRepository).singleton(),
  userFacade: asClass(UserFacadeService).singleton(),
  userGetService: asClass(UserGetService).singleton(),
  userGetManyService: asClass(UserGetMany).singleton(),
  userRegisterJwtService: asClass(UserRegisterJwtService).singleton(),
  userSignInJwtService: asClass(UserSignInJwtService).singleton(),
  userEditService: asClass(UserEditService).singleton(),
  userAdminEditService: asClass(UserAdminEditService).singleton(),
  userDeleteService: asClass(UserDeleteService).singleton(),
  userAdminDeleteService: asClass(UserAdminDeleteService).singleton(),
  userController: asClass(UserController).singleton()

});

export default container;