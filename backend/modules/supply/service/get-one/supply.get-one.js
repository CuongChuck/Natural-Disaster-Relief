import ISupplyGetOneService from './supply.interface-get-one.js';

export default class SupplyGetOneService extends ISupplyGetOneService {
  constructor({ supplySqlRepository, eventGetAllService }) {
    super();
    this.supplyRepository = supplySqlRepository;
    this.eventGetAll = eventGetAllService;
  }

  getOne = async (data) => {
    try {
      const supply = await this.supplyRepository.getOne({ id: data.id });
      supply.events = await this.eventGetAll.getAll({ supplyId: data.id, size: 1000, page: 1 });
      return supply;
    }
    catch (err) {
      throw err;
    }
  }
}