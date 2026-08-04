export default class IRequestGetOneService {
  constructor() {
    if (new.target === IRequestGetOneService) {
      throw new Error('Cannot instantiate interface.');
    }
  }

  getOne = async (data) => {
    throw new Error('Method not implemented.');
  }
}