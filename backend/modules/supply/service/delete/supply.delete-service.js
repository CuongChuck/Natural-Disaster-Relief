import ISupplyDeleteService from './supply.interface-delete.js';

export default class SupplyDeleteService extends ISupplyDeleteService {
  constructor({ supplySqlRepository }) {
    super();
    this.supplyRepository = supplySqlRepository;
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