export default class IRequestDeleteService {
  constructor() {
    if (new.target === IRequestDeleteService) {
      throw new Error('Cannot instantiate interface.');
    }
  }

  delete = async (data) => {
    throw new Error('Method not implemented.');
  }
}