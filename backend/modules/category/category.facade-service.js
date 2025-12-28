class CategoryFacadeService {
  constructor({ getAllStrategy }) {
    this.getStrategy = {
      all: getAllStrategy
    };
  }

  async getAll() {
    try {
      const strategy = this.registerStrategy.all;
      const categories = await strategy.registerUser(data);
      return {
        message: `Categories retrieved via all strategy successfully`,
        categories
      };
    }
    catch (err) {
      throw err;
    }
  }
}

export default CategoryFacadeService;