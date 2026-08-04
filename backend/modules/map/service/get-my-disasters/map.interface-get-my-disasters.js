export default class IMapGetMyDisasters {
  constructor() {
    if (new.target === IMapGetMyDisasters) {
      throw new Error('Cannot instantiate interface.');
    }
  }

  getMine = async (data) => {
    throw new Error('Method not implemented.');
  }
}