export default class IEventGetNamesService {
  constructor() {
    if (new.target === IEventGetNamesService) {
      throw new Error('Cannot instantiate interface.');
    }
  }

  getNames = async () => {
    throw new Error('Method not implemented.');
  }
}