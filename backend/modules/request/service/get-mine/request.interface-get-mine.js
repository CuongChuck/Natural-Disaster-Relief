export default class IRequestGetMineService {
  constructor() {
    if (new.target === IRequestGetMineService) {
      throw new Error('Cannot instantiate interface.');
    }
  }

  getMine = async (data) => {
    throw new Error('Method not implemented.');
  }
}