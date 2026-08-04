class IUnitGetOneService {
  constructor() {
    if (new.target === IUnitGetOneService) {
      throw new Error('Cannot instantiate interface.');
    }
  }

  getOne = async (data) => {
    throw new Error('Method not implemented.');
  }
}

export default IUnitGetOneService;