class IUserDeleteService {
  constructor() {
    if (new.target === IUserDeleteService) {
      throw new Error('Cannot instantiate interface.');
    }
  }

  async deleteUser(data) {
    throw new Error('Method not implemented.');
  }
}

export default IUserDeleteService;