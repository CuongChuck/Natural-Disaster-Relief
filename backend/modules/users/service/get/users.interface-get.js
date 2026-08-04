class IUserGetService {
  constructor() {
    if (new.target === IUserGetService) {
      throw new Error('Cannot instantiate interface.');
    }
  }

  async getUser(data) {
    throw new Error('Method not implemented.');
  }
}

export default IUserGetService;