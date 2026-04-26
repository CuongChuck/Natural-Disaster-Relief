import IRequestReviewService from "./request.interface-review.js";

export default class RequestReviewService extends IRequestReviewService {
  constructor({ requestSqlRepository, userGetService }) {
    super();
    this.requestRepository = requestSqlRepository;
    this.userGetService = userGetService;
  }

  review = async (data) => {
    try {
      const reviewer = await this.userGetService.getUser({ userId: data.reviewerId });
      if (!(['ADMIN', 'VOLUNTEER'].includes(reviewer.role)))
        throw new Error('User is not authorized to review supply');
      await this.requestRepository.updateStatus({ id: data.id, status: 2 });
      await this.requestRepository.review(data);
      return await this.requestRepository.getReview({ id: data.id });
    }
    catch (err) {
      throw err;
    }
  }
}