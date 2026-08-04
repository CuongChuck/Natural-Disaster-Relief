class IUnitGetService {
  constructor() {
    if (new.target === IUnitGetService) {
      throw new Error('Cannot instantiate interface.');
    }
  }

  async getAll() {
    throw new Error('Method not implemented.');
  }
}

export default IUnitGetService;