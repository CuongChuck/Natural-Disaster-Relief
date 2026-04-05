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
import SupplyRedisRepository from '../../modules/supply/repository/supply.redis-repository.js';
import SupplyFacadeService from '../../modules/supply/supply.facade-service.js';
import SupplyGetAllVerified from '../../modules/supply/service/get-all/supply.get-all-verified.js';
import SupplyGetAllUnverified from '../../modules/supply/service/get-all/supply.get-all-unverified.js';
import SupplyGetAllByEvent from '../../modules/supply/service/get-all/supply.get-all-by-event.js';
import SupplyGetMineVerified from '../../modules/supply/service/get-mine/supply.get-mine-verified.js';
import SupplyGetMineUnverified from '../../modules/supply/service/get-mine/supply.get-mine-unverified.js';
import SupplyGetOneVerified from '../../modules/supply/service/get-one/supply.get-one-verified.js';
import SupplyGetOneUnverified from '../../modules/supply/service/get-one/supply.get-one-unverified.js';
import SupplyGetReview from '../../modules/supply/service/get-review/supply.get-review.js';
import SupplyCreateService from '../../modules/supply/service/create/supply.create-service.js';
import SupplyCreateAcceptService from '../../modules/supply/service/create/supply.create-accept.js';
import SupplyAddProof from '../../modules/supply/service/add-proof/supply.add-proof.js';
import SupplyReviewService from '../../modules/supply/service/review/supply.review-service.js';
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
import UserCheckOperator from '../../modules/users/service/check-operator/users.check-operator.js';
import UserEditService from '../../modules/users/service/edit/users.edit-service.js';
import UserAdminEditService from '../../modules/users/service/edit/users.admin-edit-service.js';
import UserDeleteService from '../../modules/users/service/delete/users.delete-service.js';
import UserAdminDeleteService from '../../modules/users/service/delete/users.admin-delete-service.js';
import UserController from '../../modules/users/users.controller.js';
import EventController from '../../modules/event/event.controller.js';
import EventFacadeService from '../../modules/event/event.facade-service.js';
import EventSqlRepository from '../../modules/event/repository/event.sql-repository.js';
import EventRedisRepository from '../../modules/event/repository/event.redis-repository.js';
import EventGetAllService from '../../modules/event/service/get-all/event.get-all-service.js';
import EventGetOneService from '../../modules/event/service/get-one/event.get-one.js';
import EventGetNamesService from '../../modules/event/service/get-names/event.get-names.js';
import EventCreateService from '../../modules/event/service/create/event.create-service.js';
import MapController from '../../modules/map/map.controller.js';
import MapFacadeService from '../../modules/map/map.facade-service.js';
import MapSqlRepository from '../../modules/map/repository/map.sql-repository.js';
import MapRedisRepository from '../../modules/map/repository/map.redis-repository.js';
import MapCreateDisaster from '../../modules/map/service/create-disaster/map.create-disaster.js';
import MapGetOneDisaster from '../../modules/map/service/get-one-disaster/map.get-one-disaster.js';
import MapGetAllDisasters from '../../modules/map/service/get-all-disasters/map.get-all-disasters.js';
import MapGetDisasterTypes from '../../modules/map/service/get-disaster-types/map.get-disaster-types.js';
import MapEditDisaster from '../../modules/map/service/edit-disaster/map.edit-disaster.js';
import MapDeleteDisaster from '../../modules/map/service/delete-disaster/map.delete-disaster.js';
import MapGetMyDisasters from '../../modules/map/service/get-my-disasters/map.get-my-disasters.js';

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

  supplyRedisRepository: asClass(SupplyRedisRepository).scoped(),
  supplySqlRepository: asClass(SupplySqlRepository).scoped(),
  supplyFacade: asClass(SupplyFacadeService).scoped(),
  supplyGetAllService: asClass(SupplyGetAllVerified).scoped(),
  supplyGetAllVerified: asClass(SupplyGetAllVerified).scoped(),
  supplyGetAllUnverified: asClass(SupplyGetAllUnverified).scoped(),
  supplyGetAllByEvent: asClass(SupplyGetAllByEvent).scoped(),
  supplyGetMineService: asClass(SupplyGetMineVerified).scoped(),
  supplyGetMineVerified: asClass(SupplyGetMineVerified).scoped(),
  supplyGetMineUnverified: asClass(SupplyGetMineUnverified).scoped(),
  supplyGetOneService: asClass(SupplyGetOneVerified).scoped(),
  supplyGetOneVerified: asClass(SupplyGetOneVerified).scoped(),
  supplyGetOneUnverified: asClass(SupplyGetOneUnverified).scoped(),
  supplyGetReviewService: asClass(SupplyGetReview).scoped(),
  supplyCreateService: asClass(SupplyCreateAcceptService).scoped(),
  supplyAddProofService: asClass(SupplyAddProof).scoped(),
  supplyReviewService: asClass(SupplyReviewService).scoped(),
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
  userCheckService: asClass(UserCheckOperator).singleton(),
  userEditService: asClass(UserEditService).singleton(),
  userAdminEditService: asClass(UserAdminEditService).singleton(),
  userDeleteService: asClass(UserDeleteService).singleton(),
  userAdminDeleteService: asClass(UserAdminDeleteService).singleton(),
  userController: asClass(UserController).singleton(),

  eventController: asClass(EventController).scoped(),
  eventFacade: asClass(EventFacadeService).scoped(),
  eventSqlRepository: asClass(EventSqlRepository).scoped(),
  eventRedisRepository: asClass(EventRedisRepository).scoped(),
  eventGetAllService: asClass(EventGetAllService).scoped(),
  eventGetOneService: asClass(EventGetOneService).scoped(),
  eventGetNamesService: asClass(EventGetNamesService).scoped(),
  eventCreateService: asClass(EventCreateService).scoped(),

  mapController: asClass(MapController).scoped(),
  mapFacade: asClass(MapFacadeService).scoped(),
  mapSqlRepository: asClass(MapSqlRepository).scoped(),
  mapRedisRepository: asClass(MapRedisRepository).scoped(),
  mapCreateDisaster: asClass(MapCreateDisaster).scoped(),
  mapGetOneDisaster: asClass(MapGetOneDisaster).scoped(),
  mapGetAllDisasters: asClass(MapGetAllDisasters).scoped(),
  mapGetDisasterTypes: asClass(MapGetDisasterTypes).scoped(),
  mapEditDisaster: asClass(MapEditDisaster).scoped(),
  mapDeleteDisaster: asClass(MapDeleteDisaster).scoped(),
  mapGetMyDisasters: asClass(MapGetMyDisasters).scoped(),
});

export default container;