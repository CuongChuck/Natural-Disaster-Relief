import IRequestGetMineService from "./request.interface-get-mine.js";

export default class RequestGetMineService extends IRequestGetMineService {
  constructor({ requestSqlRepository }) {
    super();
    this.requestRepository = requestSqlRepository;
  }

  getMine = async (data) => {
    try {
      const limit = parseInt(data.size, 10);
      const offset = (parseInt(data.page, 10) - 1) * limit;
      data.limit = limit;
      data.offset = offset;
      delete data.size;
      delete data.page;
      const [requests, count] = await Promise.all([
        this.requestRepository.getMine(data),
        this.requestRepository.countMine(data)
      ]);
      return { requests, total_records: count };
    }
    catch (err) {
      throw err;
    }
  }
}