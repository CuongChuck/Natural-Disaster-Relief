import { createContainer, asClass, asValue, InjectionMode, asFunction } from 'awilix';

import db from '../models/index.js';
import { client } from '../config/redis.js';
import { upload, uploads } from '../config/multer.js';
import cloudinary from '../config/cloudinary.js';
import JwtService from './jwt-service.js';
import ContainerHandler from './container-handler.js';
import ControllerHelper from './controller-helper.js';
import AuthHandler from './auth-handler.js';
import ImageUploader from './image-uploader.js';
import CategoryRedisRepository from '../../modules/category/repository/category.redis-repository.js';
import CategoryFacadeService from '../../modules/category/category.facade-service.js';
import CategoryGetAllService from '../../modules/category/service/get/category.get-all-service.js';
import CategoryGetOneService from '../../modules/category/service/get-one/category.get-one.js';
import CategoryController from '../../modules/category/category.controller.js';
import SupplySqlRepository from '../../modules/supply/repository/supply.sql-repository.js';
import SupplyRedisRepository from '../../modules/supply/repository/supply.redis-repository.js';
import SupplyFacadeService from '../../modules/supply/supply.facade-service.js';
import SupplyGetAllService from '../../modules/supply/service/get-all/supply.get-all.js';
import SupplyGetMineService from '../../modules/supply/service/get-mine/supply.get-mine.js';
import SupplyGetOneService from '../../modules/supply/service/get-one/supply.get-one.js';
import SupplyGetReview from '../../modules/supply/service/get-review/supply.get-review.js';
import SupplyGetStatus from '../../modules/supply/service/get-status/supply.get-status.js';
import SupplyCreateService from '../../modules/supply/service/create/supply.create-service.js';
import SupplyAddProof from '../../modules/supply/service/add-proof/supply.add-proof.js';
import SupplyReviewService from '../../modules/supply/service/review/supply.review-service.js';
import SupplyEditService from '../../modules/supply/service/edit/supply.edit-service.js';
import SupplyDeleteService from '../../modules/supply/service/delete/supply.delete-service.js';
import SupplyCheckDeliverability from '../../modules/supply/service/check/supply.check-deliverability.js';
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
import UserDeleteService from '../../modules/users/service/delete/users.delete-service.js';
import UserController from '../../modules/users/users.controller.js';
import EventController from '../../modules/event/event.controller.js';
import EventFacadeService from '../../modules/event/event.facade-service.js';
import EventSqlRepository from '../../modules/event/repository/event.sql-repository.js';
import EventRedisRepository from '../../modules/event/repository/event.redis-repository.js';
import EventGetAllService from '../../modules/event/service/get-all/event.get-all-service.js';
import EventGetOneService from '../../modules/event/service/get-one/event.get-one.js';
import EventCreateService from '../../modules/event/service/create/event.create-service.js';
import EventGetMineService from '../../modules/event/service/get-mine/event.get-mine-service.js';
import EventEditJourney from '../../modules/event/service/edit/event.edit-journey.js';
import EventGetNamesService from '../../modules/event/service/get-names/event.get-mine-service.js';
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
import RequestController from '../../modules/request/request.controller.js';
import RequestFacadeService from '../../modules/request/request.facade-service.js';
import RequestSqlRepository from '../../modules/request/repository/request.sql-repository.js';
import RequestRedisRepository from '../../modules/request/repository/request.redis-repository.js';
import RequestGetAllService from '../../modules/request/service/get-all/request.get-all.js';
import RequestGetStatusService from '../../modules/request/service/get-status/request.get-status.js';
import RequestCreateService from '../../modules/request/service/create/request.create-service.js';
import RequestEditService from '../../modules/request/service/edit/request.edit-service.js';
import RequestDeleteService from '../../modules/request/service/delete/request.delete-service.js';
import RequestReviewService from '../../modules/request/service/review/request.review-service.js';
import RequestAddProof from '../../modules/request/service/add-proof/request.add-proof.js';
import RequestGetMineService from '../../modules/request/service/get-mine/request.get-mine.js';
import RequestGetOneService from '../../modules/request/service/get-one/request.get-one.js';
import RequestGetReview from '../../modules/request/service/get-review/request.get-review.js';
import DeliveryController from '../../modules/delivery/delivery.controller.js';
import DeliveryFacadeService from '../../modules/delivery/delivery.facade-service.js';
import DeliverySqlRepository from '../../modules/delivery/repository/delivery.sql-repository.js';
import DeliveryCreateService from '../../modules/delivery/service/create/delivery.create-service.js';
import DeliveryGetOneService from '../../modules/delivery/service/get-one/delivery.get-one.js';
import DeliveryGetMineService from '../../modules/delivery/service/get-mine/delivery.get-mine.js';
import DeliveryGetAllService from '../../modules/delivery/service/get-all/delivery.get-all.js';
import DeliveryAddProof from "../../modules/delivery/service/edit/delivery.add-proof.js";
import Injection from './injection.js';
import EventDeleteService from '../../modules/event/service/delete/event.delete-service.js';

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
  multerUpload: asValue(upload),
  multerUploads: asValue(uploads),
  cloudinary: asValue(cloudinary),
  jwtService: asClass(JwtService).singleton(),
  authHandler: asClass(AuthHandler).singleton(),
  containerHandler: asClass(ContainerHandler).singleton(),
  controllerHelper: asClass(ControllerHelper).singleton(),
  imageUploader: asClass(ImageUploader).singleton(),
  injection: asClass(Injection).singleton(),

  supplyRedisRepository: asClass(SupplyRedisRepository).scoped(),
  supplySqlRepository: asClass(SupplySqlRepository).scoped(),
  supplyFacade: asClass(SupplyFacadeService).scoped(),
  supplyGetAllService: asClass(SupplyGetAllService).scoped(),
  supplyGetMineService: asClass(SupplyGetMineService).scoped(),
  supplyGetOneService: asClass(SupplyGetOneService).scoped(),
  supplyGetReviewService: asClass(SupplyGetReview).scoped(),
  supplyGetStatusService: asClass(SupplyGetStatus).scoped(),
  supplyCreateService: asClass(SupplyCreateService).scoped(),
  supplyAddProofService: asClass(SupplyAddProof).scoped(),
  supplyReviewService: asClass(SupplyReviewService).scoped(),
  supplyEditService: asClass(SupplyEditService).scoped(),
  supplyDeleteService: asClass(SupplyDeleteService).scoped(),
  supplyCheckService: asClass(SupplyCheckDeliverability).scoped(),
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
  userDeleteService: asClass(UserDeleteService).singleton(),
  userController: asClass(UserController).singleton(),

  eventController: asClass(EventController).scoped(),
  eventFacade: asClass(EventFacadeService).scoped(),
  eventSqlRepository: asClass(EventSqlRepository).scoped(),
  eventRedisRepository: asClass(EventRedisRepository).scoped(),
  eventGetAllService: asClass(EventGetAllService).scoped(),
  eventGetOneService: asClass(EventGetOneService).scoped(),
  eventCreateService: asClass(EventCreateService).scoped(),
  eventGetMineService: asClass(EventGetMineService).scoped(),
  eventEditService: asClass(EventEditJourney).scoped(),
  eventGetNamesService: asClass(EventGetNamesService).scoped(),
  eventDeleteService: asClass(EventDeleteService).scoped(),

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

  requestController: asClass(RequestController).scoped(),
  requestFacade: asClass(RequestFacadeService).scoped(),
  requestSqlRepository: asClass(RequestSqlRepository).scoped(),
  requestRedisRepository: asClass(RequestRedisRepository).scoped(),
  requestGetAllService: asClass(RequestGetAllService).scoped(),
  requestGetStatusService: asClass(RequestGetStatusService).scoped(),
  requestCreateService: asClass(RequestCreateService).scoped(),
  requestEditService: asClass(RequestEditService).scoped(),
  requestDeleteService: asClass(RequestDeleteService).scoped(),
  requestReviewService: asClass(RequestReviewService).scoped(),
  requestAddProofService: asClass(RequestAddProof).scoped(),
  requestGetMineService: asClass(RequestGetMineService).scoped(),
  requestGetOneService: asClass(RequestGetOneService).scoped(),
  requestGetReviewService: asClass(RequestGetReview).scoped(),

  deliveryController: asClass(DeliveryController).scoped(),
  deliveryFacade: asClass(DeliveryFacadeService).scoped(),
  deliverySqlRepository: asClass(DeliverySqlRepository).scoped(),
  deliveryCreateService: asClass(DeliveryCreateService).scoped(),
  deliveryGetOneService: asClass(DeliveryGetOneService).scoped(),
  deliveryGetMineService: asClass(DeliveryGetMineService).scoped(),
  deliveryGetAllService: asClass(DeliveryGetAllService).scoped(),
  deliveryEditService: asClass(DeliveryAddProof).scoped()
});

export default container;