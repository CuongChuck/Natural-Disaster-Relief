import IEventGetMineService from "./event.interface-get-mine.js";

export default class EventGetMineService extends IEventGetMineService {
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

  getMine = async (data) => {
    try {
      const limit = parseInt(data.size, 10);
      const offset = (parseInt(data.page, 10) - 1) * limit;
      const events = await this.eventSql.getMine({ userId: data.userId, limit, offset });
      const names = await this.eventRedis.getNames();
      return this.format(names, events);
    }
    catch (err) {
      throw err;
    }
  }
}