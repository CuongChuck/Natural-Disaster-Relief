import ISupplyGetReviewService from './supply.interface-get-review.js';

export default class SupplyGetReview extends ISupplyGetReviewService {
  constructor({ supplySqlRepository }) {
    super();
    this.supplyRepository = supplySqlRepository;
  }

  getReview = async (data) => {
    try {
      const review = await this.supplyRepository.getReview(data) || await this.supplyRepository.getOne(data);
      if (!review.reviewer) review.reviewer = null;
      return review;
    }
    catch (err) {
      throw err;
    }
  }
}