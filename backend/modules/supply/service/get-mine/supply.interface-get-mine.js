class ISupplyGetMineService {
  constructor() {
    if (new.target === ISupplyGetMineService) {
      throw new Error('Cannot instantiate interface.');
    }
  }

  getMine = async (data) => {
    throw new Error('Method not implemented.');
  }
}

export default ISupplyGetMineService;