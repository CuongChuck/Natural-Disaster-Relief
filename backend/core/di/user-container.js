const { createContainer, asClass, asValue } = require('awilix');

const { User } = require('../models');
const UserSqlRepository = require('../../modules/users/repository/users.sql-repository');
const UserFacadeService = require('../../modules/users/users.facade-service');
const UserRegisterJwtService = require('../../modules/users/service/register/users.register-jwt-service');
const UserSignInJwtService = require('../../modules/users/service/signin/users.signin-jwt-service');
const UserController = require('../../modules/users/users.controller');

const container = createContainer();

container.register({
  container: asValue(container),

  userModel: asValue(User),
  IUserRepository: asClass(UserSqlRepository).scoped(),
  userFacade: asClass(UserFacadeService).scoped(),
  userRegisterJwtService: asClass(UserRegisterJwtService).scoped(),
  userSignInJwtService: asClass(UserSignInJwtService).scoped(),
  userController: asClass(UserController).scoped()
});

module.exports = container;