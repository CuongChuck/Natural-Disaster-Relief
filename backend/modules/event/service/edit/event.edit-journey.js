import IEventEditService from "./event.interface-edit.js";

export default class EventEditJourney extends IEventEditService {
  constructor({ eventSqlRepository, userCheckService, db }) {
    super();
    this.eventRepository = eventSqlRepository;
    this.userCheckService = userCheckService;
    this.db = db;
  }

  edit = async (data) => {
    try {
      await this.userCheckService.checkOperator({ userId: data.userId });
      return await this.db.sequelize.transaction(async () => {
        await this.eventRepository.edit(data);
        await this.eventRepository.editJourney(data);
        return await this.eventRepository.getOne({ id: data.id });
      });
    } catch (err) {
      throw err;
    }
  }
}