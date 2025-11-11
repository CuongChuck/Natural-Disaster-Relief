class IUserRegisterService {
  constructor() {
    if (new.target === IUserRegisterService) {
      throw new Error('Cannot instantiate interface.');
    }
  }

  async registerUser() {
    throw new Error('Method not implemented.');
  }
}

module.exports = IUserRegisterService;