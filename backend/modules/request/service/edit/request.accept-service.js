import IRequestEditService from "./request.interface-edit.js";

export default class RequestAcceptService extends IRequestEditService {
  constructor({ requestSqlRepository, userCheckService }) {
    super();
    this.requestRepository = requestSqlRepository;
    this.userCheckService = userCheckService;
  }

  edit = async (data) => {
    try {
      await this.userCheckService.checkOperator({ userId: data.userId });
      await this.requestRepository.accept(data);
    }
    catch (err) {
      throw err;
    }
  }
}