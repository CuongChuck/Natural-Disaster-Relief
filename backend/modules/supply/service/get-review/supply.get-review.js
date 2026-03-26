import ISupplyGetReviewService from './supply.interface-get-review.js';

class SupplyGetReview extends ISupplyGetReviewService {
  constructor({ supplyRepository, categoryGetOneService, unitGetOneService, userGetService }) {
    super();
    this.supplyRepository = supplyRepository;
    this.categoryGetOneService = categoryGetOneService;
    this.unitGetOneService = unitGetOneService;
    this.userGetService = userGetService;
  }

  format = (id, review, _category, _unit, donor, reviewer) => {
    const { category, unit, donorId, reviewerId, ...remain } = review;
    return {
      id: Number(id),
      category: _category,
      unit: _unit,
      donor,
      reviewer,
      ...remain
    }
  }

  getReview = async (data) => {
    try {
      const review = await this.supplyRepository.getReview(data);
      const category = await this.categoryGetOneService.getOne({ id: review.category });
      const unit = await this.unitGetOneService.getOne({ id: review.unit });
      const donor = await this.userGetService.getUser({ userId: review.donorId });
      const reviewer = await this.userGetService.getUser({ userId: review.reviewerId });
      return this.format(data.id, review, category, unit, donor.username, reviewer.username);
    }
    catch (err) {
      throw err;
    }
  }
}

export default SupplyGetReview;