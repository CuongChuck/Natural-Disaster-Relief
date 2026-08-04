import ICategoryGetOneService from './category.interface-get-one.js';

class CategoryGetOneService extends ICategoryGetOneService {
  constructor({ categoryRepository }) {
    super();
    this.categoryRepository = categoryRepository;
  }

  getOne = async (data) => {
    try {
      return await this.categoryRepository.findOne(data);
    }
    catch (err) {
      throw err;
    }
  }
}

export default CategoryGetOneService;