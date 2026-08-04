import ISupplyGetAllService from './supply.interface-get-all.js';

export default class SupplyGetAllService extends ISupplyGetAllService {
  constructor({ supplySqlRepository }) {
    super();
    this.supplyRepository = supplySqlRepository;
  }

  getAll = async (data) => {
    try {
      const { size, page, ...input } = data;
      const limit = parseInt(data.size, 10);
      const offset = (parseInt(data.page, 10) - 1) * limit;
      const [supplies, count] = await Promise.all([
        this.supplyRepository.getAll({ offset, limit, ...input }),
        this.supplyRepository.countAll(input)
      ]);
      return { supplies, total_records: count };
    }
    catch (err) {
      throw err;
    }
  }
}