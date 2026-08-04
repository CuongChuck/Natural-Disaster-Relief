import IRequestGetStatusService from './request.interface-get-status.js';

export default class RequestGetStatusService extends IRequestGetStatusService {
  constructor({ requestRedisRepository }) {
    super();
    this.requestRepository = requestRedisRepository;
  }

  getStatus = async () => {
    try {
      return await this.requestRepository.getStatus();
    }
    catch (err) {
      throw err;
    }
  }
}