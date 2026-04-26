export default class IRequestCreateService {
  constructor() {
    if (new.target === IRequestCreateService) {
      throw new Error('Cannot instantiate interface.');
    }
  }

  create = async (data) => {
    throw new Error('Method not implemented.');
  }
}