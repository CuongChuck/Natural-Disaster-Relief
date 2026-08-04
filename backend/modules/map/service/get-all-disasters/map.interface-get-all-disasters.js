export default class IMapGetAllDisasters {
  constructor() {
    if (new.target === IMapGetAllDisasters) {
      throw new Error('Cannot instantiate interface.');
    }
  }

  getAll = async (data) => {
    throw new Error('Method not implemented.');
  }
}