import IDeliveryEditService from "./delivery.interface-edit.js";

export default class DeliveryAddProof extends IDeliveryEditService {
  constructor({ deliverySqlRepository, userCheckService }) {
    super();
    this.deliveryRepository = deliverySqlRepository;
    this.userCheckService = userCheckService;
  }

  edit = async (data) => {
    try {
      await this.userCheckService.checkOperator({ userId: data.userId });
      await this.deliveryRepository.checkOwner(data);
      await this.deliveryRepository.addProof(data);
    } catch (err) {
      throw err;
    }
  }
};