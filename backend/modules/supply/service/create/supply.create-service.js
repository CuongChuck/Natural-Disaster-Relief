import ISupplyCreateService from './supply.interface-create.js';

class SupplyCreateService extends ISupplyCreateService {
  constructor({ supplyRepository }) {
    super();
    this.supplyRepository = supplyRepository;
  }

  async create(data) {
    try {
      const { strategy, ...supply } = data;
      supply.createdAt = new Date();
      supply.updatedAt = new Date();
      await this.supplyRepository.create(supply);
    }
    catch (err) {
      throw err;
    }
  }
}

export default SupplyCreateService;