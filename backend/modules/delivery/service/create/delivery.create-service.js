import IDeliveryCreateService from "./delivery.interface-create.js";

export default class DeliveryCreateService extends IDeliveryCreateService {
  constructor({ deliverySqlRepository }) {
    super();
    this.deliveryRepository = deliverySqlRepository;
  }

  create = async (data) => {
    try {
      const result = await this.deliveryRepository.create(data);
      return await this.deliveryRepository.getOne({ id: result.id });
    }
    catch (err) {
      throw err;
    }
  }
}