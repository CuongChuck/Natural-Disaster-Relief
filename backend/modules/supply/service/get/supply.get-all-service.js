import ISupplyGetService from './supply.interface-get.js';

class SupplyGetAllService extends ISupplyGetService {
  constructor({ supplyRepository }) {
    super();
    this.supplyRepository = supplyRepository;
  }

  async getAll() {
    try {
      return await this.supplyRepository.findAll();
    }
    catch (err) {
      throw err;
    }
  }
}

export default SupplyGetAllService;