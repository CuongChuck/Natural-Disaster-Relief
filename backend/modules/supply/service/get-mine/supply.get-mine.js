import ISupplyGetMineService from './supply.interface-get-mine.js';

export default class SupplyGetMineService extends ISupplyGetMineService {
  constructor({ supplySqlRepository, }) {
    super();
    this.supplyRepository = supplySqlRepository;
  }

  getMine = async (data) => {
    try {
      const limit = parseInt(data.size, 10);
      const offset = (parseInt(data.page, 10) - 1) * limit;
      const [supplies, count] = await Promise.all([
        this.supplyRepository.getMine({
          offset,
          limit,
          status: data.status,
          order: data.order,
          donorId: data.donorId
        }),
        this.supplyRepository.countMine({ status: data.status, donorId: data.donorId })
      ]);
      return { supplies, total_records: count };
    }
    catch (err) {
      throw err;
    }
  }
}