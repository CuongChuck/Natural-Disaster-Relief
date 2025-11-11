class UserFacadeService {
  constructor({ userRegisterJwtService, userSignInJwtService }) {
    this.registerStrategy = {
      jwt: userRegisterJwtService
    };

    this.signInStrategy = {
      jwt: userSignInJwtService
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
        message: `User registered via ${data.strategy} strategy`,
        user, token
      };
    }
    catch (err) {
      throw err;
    }
  }

  async signInUser(data) {
    try {
      const strategy = this.signInStrategy(data.strategy);
      const { user, token } = await strategy.signInUser({
        username: data.username,
        password: data.password
      });
      return {
        message: `User signed in via ${data.strategy} strategy`,
        user, token
      }
    }
    catch (err) {
      throw err;
    }
  }

  async editUser(data) {
    try {

    }
    catch (err) {
      throw err;
    }
  }
}

module.exports = UserFacadeService;