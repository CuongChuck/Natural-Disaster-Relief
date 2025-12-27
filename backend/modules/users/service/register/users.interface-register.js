class IUserRegisterService {
  constructor() {
    if (new.target === IUserRegisterService) {
      throw new Error('Cannot instantiate interface.');
    }
  }

  async registerUser(data) {
    throw new Error('Method not implemented.');
  }
}

export default IUserRegisterService;