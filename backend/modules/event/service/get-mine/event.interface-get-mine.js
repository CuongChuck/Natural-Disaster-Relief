export default class IEventGetMineService {
  constructor() {
    if (new.target === IEventGetMineService) {
      throw new Error('Cannot instantiate interface.');
    }
  }

  format = (names, events) => {
    throw new Error('Method not implemented.');
  }

  getMine = async (data) => {
    throw new Error('Method not implemented.');
  }
}