export default class IEventEditService {
  constructor() {
    if (new.target === IEventEditService) {
      throw new Error('Cannot instantiate interface.');
    }
  }

  edit = async (data) => {
    throw new Error('Method not implemented.');
  }
}