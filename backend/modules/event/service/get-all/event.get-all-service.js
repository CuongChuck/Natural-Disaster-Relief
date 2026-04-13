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

  getAll = async (data) => {
    try {
      const limit = parseInt(data.size, 10);
      const offset = (parseInt(data.page, 10) - 1) * limit;
      const [events, count, names] = await Promise.all([
        this.eventSql.getAll(offset, limit),
        this.eventSql.countAll(),
        this.eventRedis.getNames()
      ]);
      return { events: this.format(names, events), total_records: count };
    }
    catch (err) {
      throw err;
    }
  }
}