import IEventEditService from "./event.interface-edit.js";

export default class EventCompleteJourney extends IEventEditService {
  constructor({ eventSqlRepository, userCheckService, deliveryCreateService, supplyEditService, db }) {
    super();
    this.eventRepository = eventSqlRepository;
    this.userCheckService = userCheckService;
    this.deliveryCreateService = deliveryCreateService;
    this.supplyEditService = supplyEditService;
    this.db = db;
  }

  edit = async (data) => {
    const transaction = await this.db.sequelize.transaction();
    try {
      await this.userCheckService.checkOperator({ userId: data.userId });
      await this.eventRepository.updateJourneyStatus({ id: data.id, status: true });
      const event = await this.eventRepository.getOne({ id: data.id });
      for (const supply of event.supplies) {
        if (
          event.ward === supply.ward && 
          event.district === supply.district && 
          event.city_province === supply.city_province
        )
          await this.deliveryCreateService.create({
            id: supply.id,
            address_line: supply.address_line,
            ward: supply.ward,
            district: supply.district,
            city_province: supply.city_province
          });
          await this.supplyEditService.edit({ id: supply.id, status: 4 });
      }
      await transaction.commit();
      return event;
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  }
}