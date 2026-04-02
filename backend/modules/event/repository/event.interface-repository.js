export default class IEventRepository {
  constructor() {
    if (new.target === IEventRepository) {
      throw new Error('Cannot instantiate interface.');
    }
  }
}