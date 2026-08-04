import ICategoryGetService from './category.interface-get.js';

class CategoryGetAllService extends ICategoryGetService {
  constructor({ categoryRepository }) {
    super();
    this.categoryRepository = categoryRepository;
  }

  async getAll() {
    try {
      return await this.categoryRepository.findAll();
    }
    catch (err) {
      throw err;
    }
  }
}

export default CategoryGetAllService;