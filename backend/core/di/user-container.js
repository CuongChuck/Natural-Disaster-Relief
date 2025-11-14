const { createContainer, asClass, asValue } = require('awilix');

const { User } = require('../models');
const UserSqlRepository = require('../../modules/users/repository/users.sql-repository');
const UserFacadeService = require('../../modules/users/users.facade-service');
const UserRegisterJwtService = require('../../modules/users/service/register/users.register-jwt-service');
const UserSignInJwtService = require('../../modules/users/service/signin/users.signin-jwt-service');
const UserEditService = require('../../modules/users/service/edit/users.edit-service');
const UserAdminEditService = require('../../modules/users/service/edit/users.admin-edit-service');
const UserDeleteService = require('../../modules/users/service/delete/users.delete-service');
const UserAdminDeleteService = require('../../modules/users/service/delete/users.admin-delete-service');
const UserController = require('../../modules/users/users.controller');

const container = createContainer();

container.register({
  container: asValue(container),

  userModel: asValue(User),
  IUserRepository: asClass(UserSqlRepository).scoped(),
  userFacade: asClass(UserFacadeService).scoped(),
  userRegisterJwtService: asClass(UserRegisterJwtService).scoped(),
  userSignInJwtService: asClass(UserSignInJwtService).scoped(),
  userEditService: asClass(UserEditService).scoped(),
  userAdminEditService: asClass(UserAdminEditService).scoped(),
  userDeleteService: asClass(UserDeleteService).scoped(),
  userAdminDeleteService: asClass(UserAdminDeleteService).scoped(),
  userController: asClass(UserController).scoped()
});

module.exports = container;