export default class IMapGetDisastersTypes {
  constructor() {
    if (new.target === IMapGetDisastersTypes) {
      throw new Error('Cannot instantiate interface.');
    }
  }

  getTypes = async () => {
    throw new Error('Method not implemented.');
  }
}