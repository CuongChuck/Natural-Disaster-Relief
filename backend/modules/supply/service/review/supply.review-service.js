import ISupplyReviewService from './supply.interface-review.js';

export default class SupplyReviewService extends ISupplyReviewService {
  constructor({ supplySqlRepository, eventCreateService, userCheckService, db }) {
    super();
    this.supplyRepository = supplySqlRepository;
    this.eventCreateService = eventCreateService;
    this.userCheckService = userCheckService;
    this.db = db;
  }

  review = async (data) => {
    try {
      await this.userCheckService.checkOperator({ userId: data.reviewerId });
      return await this.db.sequelize.transaction(async () => {
        await this.supplyRepository.review(data);
        await this.eventCreateService.create({
          userId: data.reviewerId,
          description: null,
          name: 1,
          startTime: new Date(),
          address_line: null,
          ward: "admin",
          district: "admin",
          city_province: "admin",
          supplies: [data.id]
        });
        await this.supplyRepository.updateStatus({ id: data.id, status: 2 });
        return await this.supplyRepository.getReview({ id: data.id });
      });
    }
    catch (err) {
      throw err;
    }
  }
}