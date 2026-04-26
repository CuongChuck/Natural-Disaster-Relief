import IRequestGetOneService from './request.interface-get-one.js';

export default class RequestGetOneService extends IRequestGetOneService {
  constructor({ requestSqlRepository }) {
    super();
    this.requestRepository = requestSqlRepository;
  }

  getOne = async (data) => {
    try {
      return await this.requestRepository.getOne({ id: data.id });
    }
    catch (err) {
      throw err;
    }
  }
}