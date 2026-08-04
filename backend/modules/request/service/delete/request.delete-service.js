import IRequestDeleteService from "./request.interface-delete.js";

export default class RequestDeleteService extends IRequestDeleteService {
  constructor({ requestSqlRepository }) {
    super();
    this.requestRepository = requestSqlRepository;
  }

  delete = async (data) => {
    try {
      await this.requestRepository.checkOwner(data);
      await this.requestRepository.delete(data);
    }
    catch (err) {
      throw err;
    }
  }
}