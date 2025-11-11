class IUserRepository {
  constructor() {
    if (new.target === IUserRepository) {
      throw new Error('Cannot instantiate interface.');
    }
  }

  async createUser() {
    throw new Error('Method not implemented.');
  }

  async findByUsername() {
    throw new Error('Method not implemented.');
  }

  async updateUser() {
    throw new Error('Method not implemented.');
  }
}

module.exports = IUserRepository;