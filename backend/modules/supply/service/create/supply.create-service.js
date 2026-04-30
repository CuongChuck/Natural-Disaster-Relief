import ISupplyCreateService from './supply.interface-create.js';

export default class SupplyCreateService extends ISupplyCreateService {
  constructor({ supplySqlRepository }) {
    super();
    this.supplyRepository = supplySqlRepository;
  }

  create = async (data) => {
    try {
      const result = await this.supplyRepository.create(data);
      return await this.supplyRepository.getOne({ id: result.id });
    }
    catch (err) {
      throw err;
    }
  }
}