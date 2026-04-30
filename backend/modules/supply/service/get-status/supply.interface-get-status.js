export default class ISupplyGetStatusService {
  constructor() {
    if (new.target === ISupplyGetStatusService) {
      throw new Error('Cannot instantiate interface.');
    }
  }

  getStatus = async () => {
    throw new Error('Method not implemented.');
  }
}