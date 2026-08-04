class ICategoryRepository {
  constructor() {
    if (new.target === ICategoryRepository) {
      throw new Error('Cannot instantiate interface.');
    }
  }

  async findAll() {
    throw new Error('Method not implemented.');
  }
}

export default ICategoryRepository;