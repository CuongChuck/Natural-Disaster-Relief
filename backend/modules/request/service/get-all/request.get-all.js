import IRequestGetAllService from './request.interface-get-all.js';

export default class RequestGetAllService extends IRequestGetAllService {
  constructor({ requestSqlRepository }) {
    super();
    this.requestRepository = requestSqlRepository;
  }

  getAll = async (data) => {
    try {
      const limit = parseInt(data.size, 10);
      const offset = (parseInt(data.page, 10) - 1) * limit;
      const [requests, count] = await Promise.all([
        this.requestRepository.getAll({ offset, limit, type: data.type }),
        this.requestRepository.countAll()
      ]);
      return { requests, total_records: count };
    }
    catch (err) {
      throw err;
    }
  }
}