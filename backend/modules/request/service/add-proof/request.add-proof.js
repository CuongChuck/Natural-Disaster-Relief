import IRequestAddProof from "./request.interface-add-proof.js";

export default class RequestAddProof extends IRequestAddProof {
  constructor({ requestSqlRepository }) {
    super();
    this.requestRepository = requestSqlRepository;
  }

  addProof = async (data) => {
    try {
      await this.requestRepository.addProof(data);
    } catch (err) {
      throw err;
    }
  }
};