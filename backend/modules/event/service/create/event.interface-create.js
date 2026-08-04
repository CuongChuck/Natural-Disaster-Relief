export default class IEventCreateService {
  constructor() {
    if (new.target === IEventCreateService) {
      throw new Error('Cannot instantiate interface.');
    }
  }

  create = async (data) => {
    throw new Error('Method not implemented.');
  }
}