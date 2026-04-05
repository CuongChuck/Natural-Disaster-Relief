export default class IEventGetAllService {
  constructor() {
    if (new.target === IEventGetAllService) {
      throw new Error('Cannot instantiate interface.');
    }
  }

  format = (names, events) => {
    throw new Error('Method not implemented.');
  }

  getAll = async (data) => {
    throw new Error('Method not implemented.');
  }
}