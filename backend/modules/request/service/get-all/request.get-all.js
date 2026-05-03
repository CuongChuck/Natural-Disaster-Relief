import IRequestGetAllService from './request.interface-get-all.js';

export default class RequestGetAllService extends IRequestGetAllService {
  constructor({ requestSqlRepository }) {
    super();
    this.requestRepository = requestSqlRepository;
  }

  getAll = async (data) => {
    try {
      const { size, page, ...input } = data;
      const limit = parseInt(size, 10);
      const offset = (parseInt(page, 10) - 1) * limit;
      const [requests, count] = await Promise.all([
        this.requestRepository.getAll({ offset, limit, ...input }),
        this.requestRepository.countAll(input)
      ]);
      return { requests, total_records: count };
    }
    catch (err) {
      throw err;
    }
  }
}