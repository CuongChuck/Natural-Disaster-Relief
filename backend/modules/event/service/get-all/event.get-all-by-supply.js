import IEventGetAllService from "./event.interface-get-all.js";

export default class EventGetAllBySupplyService extends IEventGetAllService {
  constructor({ eventSqlRepository, eventRedisRepository }) {
    super();
    this.eventSql = eventSqlRepository;
    this.eventRedis = eventRedisRepository;
  }

  format = (names, events) => {
    return events.map((event) => {
      const { name, ...remain } = event;
      return { name: names[name], ...remain };
    });
  }

  getAll = async (data) => {
    try {
      const limit = parseInt(data.size, 10);
      const offset = (parseInt(data.page, 10) - 1) * limit;
      const events = await this.eventSql.getBySupply({ supplyId: data.supplyId, offset, limit });
      const names = await this.eventRedis.getNames();
      return this.format(names, events);
    }
    catch (err) {
      throw err;
    }
  }
}