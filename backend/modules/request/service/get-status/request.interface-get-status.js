export default class IRequestGetStatusService {
  constructor() {
    if (new.target === IRequestGetStatusService) {
      throw new Error('Cannot instantiate interface.');
    }
  }

  getStatus = async () => {
    throw new Error('Method not implemented.');
  }
}