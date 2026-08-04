export default class IDeliveryCreateService {
  constructor() {
    if (new.target === IDeliveryCreateService) {
      throw new Error('Cannot instantiate interface.');
    }
  }

  create = async (data) => {
    throw new Error('Method not implemented.');
  }
}