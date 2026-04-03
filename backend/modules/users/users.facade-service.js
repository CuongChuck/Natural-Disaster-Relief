class UserFacadeService {
  constructor(opts) {
    this.getService = opts.userGetService;
    this.registerService = opts.userRegisterJwtService;
    this.signInService = opts.userSignInJwtService;
    this.editService = opts.userEditService;
    this.deleteService = opts.userDeleteService;
  }

  getUser = async (data) => {
    try {
      const user = await this.getService.getUser(data);
      return {
        message: `User profile retrieval successfully`,
        user
      };
    } catch (err) {
      throw err;
    }
  }

  registerUser = async (data) => {
    try {
      const result = await this.registerService.registerUser(data);
      return {
        message: `Người dùng đăng ký thành công`,
        ...result
      };
    }
    catch (err) {
      throw err;
    }
  }

  signInUser = async (data) => {
    try {
      const result = await this.signInService.signInUser(data);
      return {
        message: `User signed in successfully`,
        ...result
      };
    }
    catch (err) {
      throw err;
    }
  }

  editUser = async (data) => {
    try {
      const user = await this.editService.editUser(data);
      return {
        message: `User profile edit successfully`,
        user
      };
    }
    catch (err) {
      throw err;
    }
  }

  deleteUser = async (data) => {
    try {
      await this.deleteService.deleteUser(data);
      return { message: `User deleted successfully` };
    }
    catch (err) {
      throw err;
    }
  }
}

export default UserFacadeService;