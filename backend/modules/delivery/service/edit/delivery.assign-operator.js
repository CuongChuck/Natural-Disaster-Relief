import IDeliveryEditService from "./delivery.interface-edit.js";

export default class DeliveryAssignOperator extends IDeliveryEditService {
  constructor({ deliverySqlRepository, userCheckService }) {
    super();
    this.deliveryRepository = deliverySqlRepository;
    this.userCheckService = userCheckService;
  }

  edit = async (data) => {
    try {
      await this.userCheckService.checkOperator({ userId: data.userId });
      await this.deliveryRepository.assignOperator(data);
    } catch (err) {
      throw err;
    }
  }
};