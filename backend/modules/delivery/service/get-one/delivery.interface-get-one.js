export default class IDeliveryGetOneService {
  constructor() {
    if (new.target === IDeliveryGetOneService) {
      throw new Error('Cannot instantiate interface.');
    }
  }

  getOne = async (data) => {
    throw new Error('Method not implemented.');
  }
}