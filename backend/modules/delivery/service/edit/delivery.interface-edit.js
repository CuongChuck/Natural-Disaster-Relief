export default class IDeliveryEditService {
  constructor() {
    if (new.target === IDeliveryEditService) {
      throw new Error('Cannot instantiate interface.');
    }
  }

  edit = async (data) => {
    throw new Error('Method not implemented.');
  }
};