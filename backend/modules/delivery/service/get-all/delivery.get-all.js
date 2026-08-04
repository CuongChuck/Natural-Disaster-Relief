import IDeliveryGetAllService from "./delivery.interface-get-all.js";

export default class DeliveryGetAllService extends IDeliveryGetAllService {
  constructor({ deliverySqlRepository }) {
    super();
    this.deliveryRepository = deliverySqlRepository;
  }

  getAll = async (data) => {
    try {
      const limit = parseInt(data.size, 10);
      const offset = (parseInt(data.page, 10) - 1) * limit;
      const [deliveries, count] = await Promise.all([
        this.deliveryRepository.getAll({ offset, limit }),
        this.deliveryRepository.countAll()
      ]);
      return { deliveries, total_records: count };
    }
    catch (err) {
      throw err;
    }
  }
}