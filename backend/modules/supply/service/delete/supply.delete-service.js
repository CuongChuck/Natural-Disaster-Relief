import ISupplyDeleteService from './supply.interface-delete.js';

export default class SupplyDeleteService extends ISupplyDeleteService {
  constructor({ supplyRedisRepository }) {
    super();
    this.supplyRepository = supplyRedisRepository;
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