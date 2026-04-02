import IEventCreateService from "./event.interface-create.js";

export default class EventCreateService extends IEventCreateService {
  constructor(opts) {
    super();
    this.eventSql = opts.eventSqlRepository;
    this.eventRedis = opts.eventRedisRepository;
    this.supplyGetAll = opts.supplyGetAllByEvent;
    this.supplyGetOne = opts.supplyGetOneUnverified;
  }

  create = async (data) => {
    try {
      const offset = 0;
      const limit = 100;
      const event = await this.eventSql.create(data);
      const user = await event.getUser({
        attributes: ['name', 'email', 'phone', 'role'], raw: true
      });
      const supplies = event.name === 1
        ? await this.supplyGetOne.getOne({ id: event.description.split(' ')[1] })
        : await this.supplyGetAll.getAll({ id: event.id, offset, limit });
      const name = await this.eventRedis.getName({ id: event.name });
      const result = event.toJSON();
      result.name = name;
      return { event: result, user, supplies };
    } catch (err) {
      throw err;
    }
  }
}