import IRequestGetReviewService from './request.interface-get-review.js';

export default class RequestGetReview extends IRequestGetReviewService {
  constructor({ requestSqlRepository }) {
    super();
    this.requestRepository = requestSqlRepository;
  }

  getReview = async (data) => {
    try {
      const review = await this.requestRepository.getReview(data) || await this.requestRepository.getOne(data);
      if (!review.reviewer) review.reviewer = null;
      return review;
    }
    catch (err) {
      throw err;
    }
  }
}