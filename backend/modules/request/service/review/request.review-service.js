import IRequestReviewService from "./request.interface-review.js";

export default class RequestReviewService extends IRequestReviewService {
  constructor({ requestSqlRepository, userCheckService, db }) {
    super();
    this.requestRepository = requestSqlRepository;
    this.userCheckService = userCheckService;
    this.db = db;
  }

  review = async (data) => {
    try {
      await this.userCheckService.checkOperator({ userId: data.reviewerId });
      return await this.db.sequelize.transaction(async () => {
        await this.requestRepository.updateStatus({ id: data.id, status: 2 });
        await this.requestRepository.review(data);
        return await this.requestRepository.getReview({ id: data.id });
      });
    }
    catch (err) {
      throw err;
    }
  }
}