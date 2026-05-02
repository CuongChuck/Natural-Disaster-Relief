import IDeliveryAddProof from "./delivery.interface-add-proof.js";

export default class DeliveryAddProof extends IDeliveryAddProof {
  constructor({ deliverySqlRepository }) {
    super();
    this.deliveryRepository = deliverySqlRepository;
  }

  addProof = async (data) => {
    try {
      await this.deliveryRepository.addProof(data);
    } catch (err) {
      throw err;
    }
  }
};