class UserFacadeService {
  constructor(opts) {
    this.getStrategy = {
      nonAdmin: opts.userGetService
    };

    this.registerStrategy = {
      jwt: opts.userRegisterJwtService
    };

    this.signInStrategy = {
      jwt: opts.userSignInJwtService
    };

    this.editStrategy = {
      admin: opts.userAdminEditService,
      nonAdmin: opts.userEditService
    };

    this.deleteStrategy = {
      admin: opts.userAdminDeleteService,
      nonAdmin: opts.userDeleteService
    };
  }

  async getUser(data) {
    try {
      const strategy = this.getStrategy[data.strategy];
      const user = await strategy.getUser(data);
      return {
        message: `User retrieval via ${data.strategy} strategy successfully`,
        user
      };
    } catch (err) {
      throw err;
    }
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
        message: `User profile edit via ${data.strategy} strategy successfully`,
        user
      };
    }
    catch (err) {
      throw err;
    }
  }

  async deleteUser(data) {
    try {
      const strategy = this.deleteStrategy[data.strategy];
      await strategy.deleteUser(data);
      return { message: `User deleted via ${data.strategy} strategy successfully` };
    }
    catch (err) {
      throw err;
    }
  }
}

export default UserFacadeService;