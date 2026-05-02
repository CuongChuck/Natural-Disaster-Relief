import IEventEditService from "./event.interface-edit.js";

export default class EventEditJourney extends IEventEditService {
  constructor({ eventSqlRepository, userCheckService, db }) {
    super();
    this.eventRepository = eventSqlRepository;
    this.userCheckService = userCheckService;
    this.db = db;
  }

  edit = async (data) => {
    const transaction = await this.db.sequelize.transaction();
    try {
      await this.userCheckService.checkOperator({ userId: data.userId });
      await this.eventRepository.edit(data, transaction);
      await this.eventRepository.editJourney(data, transaction);
      transaction.commit();
      return await this.eventRepository.getOne({ id: data.id });
    } catch (err) {
      transaction.rollback();
      throw err;
    }
  }
}