import ISupplyCheckService from './supply.interface-check.js';

export default class SupplyCheckDeliverability extends ISupplyCheckService {
  constructor({ supplySqlRepository }) {
    super();
    this.supplyRepository = supplySqlRepository;
  }

  check = async (data) => {
    try {
      await this.supplyRepository.checkDeliverability({ id: data.id });
    }
    catch (err) {
      throw err;
    }
  }
}