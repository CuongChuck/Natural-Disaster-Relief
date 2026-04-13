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
      const [events, count, names] = await Promise.all([
        this.eventSql.getMine({ userId: data.userId, limit, offset }),
        this.eventSql.countMine({ userId: data.userId }),
        this.eventRedis.getNames()
      ]);
      return { events: this.format(names, events), total_records: count };
    }
    catch (err) {
      throw err;
    }
  }
}