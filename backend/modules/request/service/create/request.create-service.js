import IRequestCreateService from "./request.interface-create.js";

export default class RequestCreateService extends IRequestCreateService {
  constructor({ requestSqlRepository }) {
    super();
    this.requestRepository = requestSqlRepository;
  }

  create = async (data) => {
    try {
      return await this.requestRepository.create(data);
    }
    catch (err) {
      throw err;
    }
  }
}