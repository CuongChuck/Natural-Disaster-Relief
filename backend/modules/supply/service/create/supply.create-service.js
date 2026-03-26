import ISupplyCreateService from './supply.interface-create.js';

class SupplyCreateService extends ISupplyCreateService {
  constructor({ supplyRepository }) {
    super();
    this.supplyRepository = supplyRepository;
  }

  create = async (data) => {
    try {
      data.createdAt = new Date();
      data.updatedAt = new Date();
      await this.supplyRepository.create(data);
    }
    catch (err) {
      throw err;
    }
  }
}

export default SupplyCreateService;