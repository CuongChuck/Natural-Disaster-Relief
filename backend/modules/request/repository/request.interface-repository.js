export default class IRequestRepository {
  constructor() {
    if (new.target === IRequestRepository) {
      throw new Error('Cannot instantiate interface.');
    }
  }
}