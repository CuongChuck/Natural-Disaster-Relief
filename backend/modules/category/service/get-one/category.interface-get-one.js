class ICategoryGetOneService {
  constructor() {
    if (new.target === ICategoryGetOneService) {
      throw new Error('Cannot instantiate interface.');
    }
  }

  getOne = async (data) => {
    throw new Error('Method not implemented.');
  }
}

export default ICategoryGetOneService;