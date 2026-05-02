export default class IDeliveryGetAllService {
  constructor() {
    if (new.target === IDeliveryGetAllService) {
      throw new Error('Cannot instantiate interface.');
    }
  }

  getAll = async (data) => {
    throw new Error('Method not implemented.');
  }
}