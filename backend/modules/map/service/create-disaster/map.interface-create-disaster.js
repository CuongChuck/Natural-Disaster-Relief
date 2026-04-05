export default class IMapCreateDisaster {
  constructor() {
    if (new.target === IMapCreateDisaster) {
      throw new Error('Cannot instantiate interface.');
    }
  }

  create = async (data) => {
    throw new Error('Method not implemented.');
  }
}