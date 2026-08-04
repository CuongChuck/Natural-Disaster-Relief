class CategoryFacadeService {
  constructor({ categoryGetAllService }) {
    this.getAllService = categoryGetAllService;
  }

  getAll = async () => {
    try {
      const categories = await this.getAllService.getAll();
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