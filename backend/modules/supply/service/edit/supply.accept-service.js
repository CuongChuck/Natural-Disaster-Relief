import ISupplyEditService from './supply.interface-edit.js';

export default class SupplyAcceptService extends ISupplyEditService {
  constructor({ supplySqlRepository, userCheckService, eventCreateService, db }) {
    super();
    this.supplyRepository = supplySqlRepository;
    this.userCheckService = userCheckService;
    this.eventCreateService = eventCreateService;
    this.db = db;
  }

  edit = async (data) => {
    try {
      await this.userCheckService.checkOperator({ userId: data.userId });
      return await this.db.sequelize.transaction(async () => {
        await this.supplyRepository.updateStatus({ id: data.id, status: 3 });
        await this.eventCreateService.create({
          userId: data.userId,
          description: null,
          name: 2,
          startTime: new Date(),
          address_line: null,
          ward: "",
          district: "",
          city_province: "",
          supplies: [data.id]
        });
      });
    }
    catch (err) {
      throw err;
    }
  }
}