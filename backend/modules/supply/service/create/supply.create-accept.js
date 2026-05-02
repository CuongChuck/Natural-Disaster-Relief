import ISupplyCreateService from './supply.interface-create.js';

export default class SupplyCreateAcceptService extends ISupplyCreateService {
  constructor({ supplySqlRepository, userCheckService, eventCreateService, db }) {
    super();
    this.supplyRepository = supplySqlRepository;
    this.userCheckService = userCheckService;
    this.eventCreateService = eventCreateService;
    this.db = db;
  }

  accept = async (data) => {
    try {
      await this.userCheckService.checkOperator({ userId: data.userId });
      const id = data.id;
      return await this.db.sequelize.transaction(async () => {
        await this.supplyRepository.updateStatus({ id, status: 3 });
        await this.eventCreateService.create({
          userId: data.userId,
          description: null,
          name: 2,
          startTime: new Date(),
          address_line: null,
          ward: "admin",
          district: "admin",
          city_province: "admin",
          supplies: [id]
        });
      });
    }
    catch (err) {
      throw err;
    }
  }
}