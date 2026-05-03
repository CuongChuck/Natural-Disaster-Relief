import IDeliveryEditService from "./delivery.interface-edit.js";

export default class DeliveryAddProof extends IDeliveryEditService {
  constructor({ deliverySqlRepository, userCheckService, supplyEditService, eventCreateService, db }) {
    super();
    this.deliveryRepository = deliverySqlRepository;
    this.userCheckService = userCheckService;
    this.supplyEditService = supplyEditService;
    this.eventCreateService = eventCreateService;
    this.db = db;
  }

  edit = async (data) => {
    try {
      await this.userCheckService.checkOperator({ userId: data.userId });
      return await this.db.sequelize.transaction(async () => {
        await this.deliveryRepository.checkOwner(data);
        await this.deliveryRepository.addProof(data);
        const supplyId = await this.deliveryRepository.getSupplyId(data);
        await this.supplyEditService.edit({ id: supplyId, status: 6 });
        const delivery = await this.deliveryRepository.getOne({ id: data.id });
        await this.eventCreateService.create({
          userId: data.userId,
          description: null,
          name: 4,
          startTime: new Date(),
          address_line: delivery.address_line,
          ward: delivery.ward,
          district: delivery.district,
          city_province: delivery.city_province,
          supplies: [supplyId]
        });
      });
    } catch (err) {
      throw err;
    }
  }
};