import IEventGetAllService from "./event.interface-get-all.js";

export default class EventGetAllBySupplyService extends IEventGetAllService {
  constructor({ eventSqlRepository }) {
    super();
    this.eventRepository = eventSqlRepository;
  }

  getAll = async (data) => {
    try {
      return await this.eventRepository.getBySupply({ supplyId: data.supplyId });
    }
    catch (err) {
      throw err;
    }
  }
}