import { createContainer, asClass, asValue } from 'awilix';

import db from '../models/index.js';
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