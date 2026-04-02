import ISupplyAddProof from "./supply.interface-add-proof.js";

export default class SupplyAddProof extends ISupplyAddProof {
  constructor({ supplySqlRepository, userCheckService, eventCreateService }) {
    super();
    this.supplyRepository = supplySqlRepository;
    this.userCheckService = userCheckService;
    this.eventCreateService = eventCreateService;
  }

  addProof = async (data) => {
    try {
      await this.userCheckService.checkOperator({ userId: data.userId });
      await this.supplyRepository.addProof(data);
      await this.eventCreateService.create({
        userId: data.userId,
        description: null,
        name: 3,
        startTime: new Date(),
        address_line: null,
        ward: "admin",
        district: "admin",
        city_province: "admin",
        supplies: [data.id]
      })
    } catch (err) {
      throw err;
    }
  }
};