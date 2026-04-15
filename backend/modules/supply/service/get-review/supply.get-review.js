import ISupplyGetReviewService from './supply.interface-get-review.js';

export default class SupplyGetReview extends ISupplyGetReviewService {
  constructor({ supplyRedisRepository, categoryGetOneService, unitGetOneService, userGetService }) {
    super();
    this.supplyRepository = supplyRedisRepository;
    this.categoryGetOneService = categoryGetOneService;
    this.unitGetOneService = unitGetOneService;
    this.userGetService = userGetService;
  }

  format = (id, review, _category, _unit, donor, reviewer) => {
    review.updated = true;
    delete review.updatedAt;
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

  isEmpty = (obj) => {
    for (let key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) return false;
    }
    return true;
  }

  getReview = async (data) => {
    try {
      const review = await this.supplyRepository.getReview(data) || await this.supplyRepository.getOne(data);
      const category = await this.categoryGetOneService.getOne({ id: review.category });
      const unit = await this.unitGetOneService.getOne({ id: review.unit });
      const donor = await this.userGetService.getUser({ userId: review.donorId });
      const reviewer = review.reviewerId ? await this.userGetService.getUser({ userId: review.reviewerId }) : { username: null };
      return this.format(data.id, review, category, unit, donor.username, reviewer.username);
    }
    catch (err) {
      throw err;
    }
  }
}