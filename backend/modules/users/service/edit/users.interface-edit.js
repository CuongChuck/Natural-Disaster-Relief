class IUserEditService {
  constructor() {
    if (new.target === IUserEditService) {
      throw new Error('Cannot instantiate interface.');
    }
  }

  async editUser() {
    throw new Error('Method not implemented.');
  }
}

module.exports = IUserEditService;