class CategoryFacadeService {
  constructor({ categoryGetAllService }) {
    this.getStrategy = {
      all: categoryGetAllService
    };
  }

  async getAll() {
    try {
      const strategy = this.getStrategy.all;
      const categories = await strategy.getAll();
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