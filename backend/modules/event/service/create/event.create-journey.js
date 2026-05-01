import IEventCreateService from "./event.interface-create.js";

export default class EventCreateJourney extends IEventCreateService {
  constructor({ eventSqlRepository, userCheckService, supplyCheckService, db }) {
    super();
    this.eventRepository = eventSqlRepository;
    this.userCheckService = userCheckService;
    this.supplyCheckService = supplyCheckService;
    this.db = db;
  }

  create = async (data) => {
    const transaction = await this.db.sequelize.transaction();
    try {
      await this.userCheckService.checkOperator({ userId: data.userId });
      for (const id of data.supplies) {
        await this.supplyCheckService.check({ id });
      }
      const event = await this.eventRepository.create({ name: 3, ...data }, transaction);
      await this.eventRepository.createJourney({ id: event.id, ...data }, transaction);
      await transaction.commit();
      return await this.eventRepository.getOne({ id: event.id });
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  }
}