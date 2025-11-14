class UserFacadeService {
  constructor({
                userRegisterJwtService,
                userSignInJwtService,
                userEditService,
                userAdminEditService,
                userDeleteService,
                userAdminDeleteService
  }) {
    this.registerStrategy = {
      jwt: userRegisterJwtService
    };

    this.signInStrategy = {
      jwt: userSignInJwtService
    };

    this.editStrategy = {
      admin: userAdminEditService,
      nonAdmin: userEditService
    };

    this.deleteStrategy = {
      admin: userAdminDeleteService,
      nonAdmin: userDeleteService
    };
  }

  async registerUser(data) {
    try {
      const strategy = this.registerStrategy[data.strategy];
      const { user, token } = await strategy.registerUser({
        name: data.name,
        username: data.username,
        email: data.email,
        password: data.password,
        role: data.role
      });
      return {
        message: `User registered via ${data.strategy} strategy successfully`,
        user, token
      };
    }
    catch (err) {
      throw err;
    }
  }

  async signInUser(data) {
    try {
      const strategy = this.signInStrategy[data.strategy];
      const { user, token } = await strategy.signInUser({
        username: data.username,
        password: data.password
      });
      return {
        message: `User signed in via ${data.strategy} strategy successfully`,
        user, token
      };
    }
    catch (err) {
      throw err;
    }
  }

  async editUser(data) {
    try {
      const strategy = this.editStrategy['main'];
      const user = await strategy.editUser({
        token: data.token,
        name: data.name,
        username: data.username,
        email: data.email,
        password: data.password
      });
      return {
        message: `User signed in via ${data.strategy} strategy successfully`,
        user
      };
    }
    catch (err) {
      throw err;
    }
  }

  async deleteUser(data) {
    try {
      const strategyId = data.strategy === 'admin' ? data.strategy : 'nonAdmin';
      const strategy = this.deleteStrategy[strategyId];
      await strategy.deleteUser({ token: data.token });
      return { message: `User deleted via ${strategyId} strategy successfully` };
    }
    catch (err) {
      throw err;
    }
  }
}

module.exports = UserFacadeService;