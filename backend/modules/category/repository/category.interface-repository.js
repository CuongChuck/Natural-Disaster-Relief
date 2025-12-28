class IUserRepository {
  constructor() {
    if (new.target === IUserRepository) {
      throw new Error('Cannot instantiate interface.');
    }
  }

  async findAll() {
    throw new Error('Method not implemented.');
  }
}

export default IUserRepository;