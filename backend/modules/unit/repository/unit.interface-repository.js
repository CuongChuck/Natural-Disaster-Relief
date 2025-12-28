class IUnitRepository {
  constructor() {
    if (new.target === IUnitRepository) {
      throw new Error('Cannot instantiate interface.');
    }
  }

  async findAll() {
    throw new Error('Method not implemented.');
  }
}

export default IUnitRepository;