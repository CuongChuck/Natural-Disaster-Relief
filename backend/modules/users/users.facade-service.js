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
      const { user, token } = await strategy.registerUser(data);
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
      const { user, token } = await strategy.signInUser(data);
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
      const strategy = this.editStrategy[data.strategy];
      const user = await strategy.editUser(data);
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

export default UserFacadeService;