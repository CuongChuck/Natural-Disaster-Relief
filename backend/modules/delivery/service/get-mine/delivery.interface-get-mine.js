export default class IDeliveryGetMineService {
  constructor() {
    if (new.target === IDeliveryGetMineService) {
      throw new Error('Cannot instantiate interface.');
    }
  }

  getMine = async (data) => {
    throw new Error('Method not implemented.');
  }
}