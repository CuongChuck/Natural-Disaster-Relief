import IEventDeleteService from "./event.interface-delete.js";

export default class EventDeleteService extends IEventDeleteService {
  constructor({ eventSqlRepository, userCheckService, db }) {
    super();
    this.eventRepository = eventSqlRepository;
    this.userCheckService = userCheckService;
    this.db = db;
  }

  delete = async (data) => {
    try {
      await this.userCheckService.checkOperator(data);
      return await this.db.sequelize.transaction(async () => {
        await this.eventRepository.delete(data);
      });
    }
    catch (err) {
      throw err;
    }
  }
}