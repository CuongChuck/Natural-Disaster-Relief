class ISupplyGetOneService {
  constructor() {
    if (new.target === ISupplyGetOneService) {
      throw new Error('Cannot instantiate interface.');
    }
  }

  getOne = async (data) => {
    throw new Error('Method not implemented.');
  }
}

export default ISupplyGetOneService;