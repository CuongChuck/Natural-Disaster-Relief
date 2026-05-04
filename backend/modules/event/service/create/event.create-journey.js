import IEventCreateService from "./event.interface-create.js";

export default class EventCreateJourney extends IEventCreateService {
  constructor({ eventSqlRepository, userCheckService, supplyCheckService, supplyEditService, db }) {
    super();
    this.eventRepository = eventSqlRepository;
    this.userCheckService = userCheckService;
    this.supplyCheckService = supplyCheckService;
    this.supplyEditService = supplyEditService;
    this.db = db;
  }

  create = async (data) => {
    try {
      await this.userCheckService.checkOperator({ userId: data.userId });
      return await this.db.sequelize.transaction(async () => {
        for (const id of data.supplies) {
          await this.supplyCheckService.check({ id });
          await this.supplyEditService.edit({ id, status: 7 });
        }
        const event = await this.eventRepository.create({ name: 3, ...data });
        await this.eventRepository.createJourney({ id: event.id, ...data });
        return await this.eventRepository.getOne({ id: event.id });
      });
    } catch (err) {
      throw err;
    }
  }
}