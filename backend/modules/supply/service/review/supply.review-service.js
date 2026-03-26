import ISupplyReviewService from './supply.interface-review.js';

class SupplyReviewService extends ISupplyReviewService {
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

  review = async (data) => {
    try {
      const reviewer = await this.userGetService.getUser({ userId: data.reviewerId });
      if (!(['ADMIN', 'VOLUNTEER'].includes(reviewer.role)))
        throw new Error('User is not authorized to review supply');
      const _review = await this.supplyRepository.getReview({ id: data.id });
      if (_review && _review.updated) throw new Error('User has already review this supply');
      const supply = await this.supplyRepository.getOne({ id: data.id });
      data.donorId = supply.donorId;
      data.updated = true;
      data.createdAt = new Date();
      await this.supplyRepository.review(data);
      const review = await this.supplyRepository.getReview({ id: data.id });
      const category = await this.categoryGetOneService.getOne({ id: review.category });
      const unit = await this.unitGetOneService.getOne({ id: review.unit });
      const donor = await this.userGetService.getUser({ userId: supply.donorId });
      return this.format(data.id, review, category, unit, donor.username, reviewer.username);
    }
    catch (err) {
      throw err;
    }
  }
}

export default SupplyReviewService;