export default class IMapRepository {
  constructor() {
    if (new.target === IMapRepository) {
      throw new Error('Cannot instantiate interface.');
    }
  }
}