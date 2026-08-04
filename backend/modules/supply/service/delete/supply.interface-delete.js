class ISupplyDeleteService {
  constructor() {
    if (new.target === ISupplyDeleteService) {
      throw new Error('Cannot instantiate interface.');
    }
  }

  async delete(data) {
    throw new Error('Method not implemented.');
  }
}

export default ISupplyDeleteService;