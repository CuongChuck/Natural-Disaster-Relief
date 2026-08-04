export default class ISupplyGetAllService {
  constructor() {
    if (new.target === ISupplyGetAllService) {
      throw new Error('Cannot instantiate interface.');
    }
  }

  getAll = async (data) => {
    throw new Error('Method not implemented.');
  }
}