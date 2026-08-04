export default class IRequestEditService {
  constructor() {
    if (new.target === IRequestEditService) {
      throw new Error('Cannot instantiate interface.');
    }
  }

  async edit(data) {
    throw new Error('Method not implemented.');
  }
}