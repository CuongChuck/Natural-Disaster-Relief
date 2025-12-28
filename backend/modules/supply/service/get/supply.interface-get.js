class ISupplyGetService {
  constructor() {
    if (new.target === ISupplyGetService) {
      throw new Error('Cannot instantiate interface.');
    }
  }

  async getAll() {
    throw new Error('Method not implemented.');
  }
}

export default ISupplyGetService;