export default class IMapGetOneDisaster {
  constructor() {
    if (new.target === IMapGetOneDisaster) {
      throw new Error('Cannot instantiate interface.');
    }
  }

  getOne = async (data) => {
    throw new Error('Method not implemented.');
  }
}