class ISupplyCreateService {
  constructor() {
    if (new.target === ISupplyCreateService) {
      throw new Error('Cannot instantiate interface.');
    }
  }

  async create(data) {
    throw new Error('Method not implemented.');
  }
}

export default ISupplyCreateService;