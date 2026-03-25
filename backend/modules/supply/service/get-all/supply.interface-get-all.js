class ISupplyGetAllService {
  constructor() {
    if (new.target === ISupplyGetAllService) {
      throw new Error('Cannot instantiate interface.');
    }
  }

  getAll = async () => {
    throw new Error('Method not implemented.');
  }
}

export default ISupplyGetAllService;