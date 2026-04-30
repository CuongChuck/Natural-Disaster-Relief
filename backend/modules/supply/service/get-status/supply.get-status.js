import ISupplyGetStatusService from './supply.interface-get-status.js';

export default class SupplyGetStatus extends ISupplyGetStatusService {
  constructor({ supplyRedisRepository }) {
    super();
    this.supplyRepository = supplyRedisRepository;
  }

  getStatus = async () => {
    try {
      return await this.supplyRepository.getStatus();
    }
    catch (err) {
      throw err;
    }
  }
}