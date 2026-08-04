import IDeliveryGetOneService from "./delivery.interface-get-one.js";

export default class DeliveryGetOneService extends IDeliveryGetOneService {
  constructor({ deliverySqlRepository }) {
    super();
    this.deliveryRepository = deliverySqlRepository;
  }

  getOne = async (data) => {
    try {
      return await this.deliveryRepository.getOne({ id: data.id });
    }
    catch (err) {
      throw err;
    }
  }
}