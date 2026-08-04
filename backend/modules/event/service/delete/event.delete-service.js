import IEventDeleteService from "./event.interface-delete.js";

export default class EventDeleteService extends IEventDeleteService {
  constructor({ eventSqlRepository, userCheckService, supplyEditService, db }) {
    super();
    this.eventRepository = eventSqlRepository;
    this.userCheckService = userCheckService;
    this.supplyEditService = supplyEditService;
    this.db = db;
  }

  delete = async (data) => {
    try {
      await this.userCheckService.checkOperator(data);
      return await this.db.sequelize.transaction(async () => {
        const supplyIds = await this.eventRepository.getSupplyIds(data);
        for (const supply of supplyIds) 
          await this.supplyEditService.edit({ id: supply.supplyId, status: 3 });
        await this.eventRepository.delete(data);
      });
    }
    catch (err) {
      throw err;
    }
  }
}