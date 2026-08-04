class ISupplyCreateService {
  constructor() {
    if (new.target === ISupplyCreateService) {
      throw new Error('Cannot instantiate interface.');
    }
  }

  create = async (data) => {
    throw new Error('Method not implemented.');
  }
}

export default ISupplyCreateService;