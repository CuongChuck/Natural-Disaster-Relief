export default class IEventDeleteService {
  constructor() {
    if (new.target === IEventDeleteService) {
      throw new Error('Cannot instantiate interface.');
    }
  }

  delete = async (data) => {
    throw new Error('Method not implemented.');
  }
}