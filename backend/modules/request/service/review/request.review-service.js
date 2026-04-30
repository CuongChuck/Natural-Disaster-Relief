import IRequestReviewService from "./request.interface-review.js";

export default class RequestReviewService extends IRequestReviewService {
  constructor({ requestSqlRepository, userCheckService }) {
    super();
    this.requestRepository = requestSqlRepository;
    this.userCheckService = userCheckService;
  }

  review = async (data) => {
    try {
      await this.userCheckService.checkOperator({ userId: data.reviewerId });
      await this.requestRepository.updateStatus({ id: data.id, status: 2 });
      await this.requestRepository.review(data);
      return await this.requestRepository.getReview({ id: data.id });
    }
    catch (err) {
      throw err;
    }
  }
}