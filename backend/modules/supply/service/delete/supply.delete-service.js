import ISupplyDeleteService from './supply.interface-delete.js';

class SupplyDeleteService extends ISupplyDeleteService {
  constructor({ supplyRepository }) {
    super();
    this.supplyRepository = supplyRepository;
  }

  delete = async (data) => {
    try {
      await this.supplyRepository.checkOwner(data);
      await this.supplyRepository.delete(data);
    }
    catch (err) {
      throw err;
    }
  }
}

export default SupplyDeleteService;