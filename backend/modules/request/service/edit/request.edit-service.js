import IRequestEditService from "./request.interface-edit.js";

export default class RequestEditService extends IRequestEditService {
  constructor({ requestSqlRepository }) {
    super();
    this.requestRepository = requestSqlRepository;
  }

  edit = async (data) => {
    try {
      await this.requestRepository.checkOwner({
        id: data.id,
        recipientId: data.recipientId
      });
      await this.requestRepository.edit(data);
      return await this.requestRepository.getOne({ id: data.id });
    }
    catch (err) {
      throw err;
    }
  }
}