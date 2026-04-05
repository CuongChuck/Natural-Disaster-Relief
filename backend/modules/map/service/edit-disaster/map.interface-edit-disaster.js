export default class IMapEditDisaster {
  constructor() {
    if (new.target === IMapEditDisaster) {
      throw new Error('Cannot instantiate interface.');
    }
  }

  edit = async (data) => {
    throw new Error('Method not implemented.');
  }
}