import IDeliveryGetMineService from "./delivery.interface-get-mine.js";

export default class DeliveryGetMineService extends IDeliveryGetMineService {
  constructor({ deliverySqlRepository }) {
    super();
    this.deliveryRepository = deliverySqlRepository;
  }

  getMine = async (data) => {
    try {
      const limit = parseInt(data.size, 10);
      const offset = (parseInt(data.page, 10) - 1) * limit;
      data.limit = limit;
      data.offset = offset;
      delete data.size;
      delete data.page;
      const [deliveries, count] = await Promise.all([
        this.deliveryRepository.getMine(data),
        this.deliveryRepository.countMine(data)
      ]);
      return { deliveries, total_records: count };
    }
    catch (err) {
      throw err;
    }
  }
}
