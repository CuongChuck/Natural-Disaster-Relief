import ICategoryRepository from './category.interface-repository.js';

class CategoryRedisRepository extends ICategoryRepository {
  constructor({ redisClient }) {
    super();
    this.redis = redisClient;
  }

  findAll = async () => {
    try {
      return await this.redis.hGetAll('category');
    }
    catch (err) {
      throw new Error("Categories retrieval failed: " + err.message);
    }
  }

  findOne = async (data) => {
    try {
      return await this.redis.hGet('category', data.id);
    } catch (err) {
      throw new Error(`Category ${data.id} retrieval failed: ` + err.message);
    }
  }
}

export default CategoryRedisRepository;