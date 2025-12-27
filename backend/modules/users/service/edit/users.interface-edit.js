class IUserEditService {
  constructor() {
    if (new.target === IUserEditService) {
      throw new Error('Cannot instantiate interface.');
    }
  }

  async editUser(data) {
    throw new Error('Method not implemented.');
  }
}

export default IUserEditService;