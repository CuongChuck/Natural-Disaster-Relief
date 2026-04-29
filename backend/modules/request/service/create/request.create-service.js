import IRequestCreateService from "./request.interface-create.js";

export default class RequestCreateService extends IRequestCreateService {
  constructor({ requestSqlRepository }) {
    super();
    this.requestRepository = requestSqlRepository;
  }

  create = async (data) => {
    try {
      const result = await this.requestRepository.create(data);
      return await this.requestRepository.getOne({ id: result.id });
    }
    catch (err) {
      throw err;
    }
  }
}