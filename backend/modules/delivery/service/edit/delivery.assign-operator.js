import IDeliveryEditService from "./delivery.interface-edit.js";

export default class DeliveryAssignOperator extends IDeliveryEditService {
  constructor({ deliverySqlRepository, userCheckService, supplyEditService, db }) {
    super();
    this.deliveryRepository = deliverySqlRepository;
    this.userCheckService = userCheckService;
    this.supplyEditService = supplyEditService;
    this.db = db;
  }

  edit = async (data) => {
    try {
      await this.userCheckService.checkOperator({ userId: data.userId });
      return await this.db.sequelize.transaction(async () => {
        await this.deliveryRepository.assignOperator(data);
        const supplyId = await this.deliveryRepository.getSupplyId(data);
        await this.supplyEditService.edit({ id: supplyId, status: 5 });
      });
    } catch (err) {
      throw err;
    }
  }
};