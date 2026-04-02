import IEventGetAllService from "./event.interface-get-all.js";

export default class EventGetAllService extends IEventGetAllService {
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

  getAll = async (page, size) => {
    try {
      const limit = parseInt(size, 10);
      const offset = (parseInt(page, 10) - 1) * limit;
      const events = await this.eventSql.getAll(offset, limit);
      const names = await this.eventRedis.getNames();
      return this.format(names, events);
    }
    catch (err) {
      throw err;
    }
  }
}