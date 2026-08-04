export default class IEventGetOneService {
  constructor() {
    if (new.target === IEventGetOneService) {
      throw new Error('Cannot instantiate interface.');
    }
  }

  getOne = async (data) => {
    throw new Error('Method not implemented.');
  }
}