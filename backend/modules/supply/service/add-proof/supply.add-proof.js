import ISupplyAddProof from "./supply.interface-add-proof.js";

export default class SupplyAddProof extends ISupplyAddProof {
  constructor({ supplySqlRepository, userCheckService }) {
    super();
    this.supplyRepository = supplySqlRepository;
    this.userCheckService = userCheckService;
  }

  addProof = async (data) => {
    try {
      await this.userCheckService.checkOperator({ userId: data.userId });
      await this.supplyRepository.addProof(data);
    } catch (err) {
      throw err;
    }
  }
};