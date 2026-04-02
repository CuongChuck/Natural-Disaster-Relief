import IEventGetOneService from './event.interface-get-one.js';

export default class EventGetOneService extends IEventGetOneService {
  constructor(opts) {
    super();
    this.eventSql = opts.eventSqlRepository;
    this.eventRedis = opts.eventRedisRepository;
    this.supplyGetAll = opts.supplyGetAllByEvent;
    this.supplyGetOne = opts.supplyGetOneUnverified;
  }

  getOne = async (data) => {
    try {
      const limit = parseInt(data.size, 10);
      const offset = (parseInt(data.page, 10) - 1) * limit;
      delete data.page;
      delete data.size;
      const event = await this.eventSql.getOne(data);
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
    }
    catch (err) {
      throw err;
    }
  }
}