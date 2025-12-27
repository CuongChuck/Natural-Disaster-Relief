class IUserRepository {
  constructor() {
    if (new.target === IUserRepository) {
      throw new Error('Cannot instantiate interface.');
    }
  }

  async createUser(data, transaction) {
    throw new Error('Method not implemented.');
  }

  async findByUsername(data, transaction) {
    throw new Error('Method not implemented.');
  }

  async updateUser(data, transaction) {
    throw new Error('Method not implemented.');
  }
}

export default IUserRepository;