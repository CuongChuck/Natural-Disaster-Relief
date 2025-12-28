import ICategoryRepository from './category.interface-repository.js';

class CategorySqlRepository extends ICategoryRepository {
  constructor({ Category }) {
    super();
    this.Category = Category;
  }

  async findAll() {
    try {
      return await this.Category.findAll();
    }
    catch (err) {
      throw new Error("Category retrieval failed: " + err.message);
    }
  }
}

export default CategorySqlRepository;