class ICategoryGetService {
  constructor() {
    if (new.target === ICategoryGetService) {
      throw new Error('Cannot instantiate interface.');
    }
  }

  async getAll() {
    throw new Error('Method not implemented.');
  }
}

export default ICategoryGetService;