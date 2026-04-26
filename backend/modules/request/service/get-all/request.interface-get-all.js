export default class IRequestGetAllService {
  constructor() {
    if (new.target === IRequestGetAllService) {
      throw new Error('Cannot instantiate interface.');
    }
  }

  getAll = async (data) => {
    throw new Error('Method not implemented.');
  }
}