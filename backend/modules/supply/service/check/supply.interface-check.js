export default class ISupplyCheckService {
  constructor() {
    if (new.target === ISupplyCheckService) {
      throw new Error('Cannot instantiate interface.');
    }
  }

  check = async (data) => {
    throw new Error('Method not implemented.');
  }
}