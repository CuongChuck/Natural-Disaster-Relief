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
    try {
      await this.userCheckService.checkOperator({ userId: data.userId });
      return await this.db.sequelize.transaction(async () => {
        await this.eventRepository.updateJourneyStatus({ id: data.id, status: true });
        const event = await this.eventRepository.getOne({ id: data.id });
        for (const supply of event.supplies) {
          if (
            event.dest_ward === supply.ward && 
            event.dest_district === supply.district && 
            event.dest_city_province === supply.city_province
          ) {
            await this.deliveryCreateService.create({
              id: supply.id,
              address_line: supply.address_line,
              ward: supply.ward,
              district: supply.district,
              city_province: supply.city_province
            });
            await this.supplyEditService.edit({ id: supply.id, status: 4 });
          }
          else await this.supplyEditService.edit({ id: supply.id, status: 3 });
        }
      });
      return event;
    } catch (err) {
      throw err;
    }
  }
}