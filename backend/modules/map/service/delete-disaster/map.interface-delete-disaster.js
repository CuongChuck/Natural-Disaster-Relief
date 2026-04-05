export default class IMapDeleteDisaster {
  constructor() {
    if (new.target === IMapDeleteDisaster) {
      throw new Error('Cannot instantiate interface.');
    }
  }

  delete = async (data) => {
    throw new Error('Method not implemented.');
  }
}