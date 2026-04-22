import ISupplyEditService from './supply.interface-edit.js';

export default class SupplyEditService extends ISupplyEditService {
  constructor({ supplyRedisRepository, categoryGetOneService, unitGetOneService, userGetService }) {
    super();
    this.supplyRepository = supplyRedisRepository;
    this.categoryGetOneService = categoryGetOneService;
    this.unitGetOneService = unitGetOneService;
    this.userGetService = userGetService;

  }

  format = (id, supply, _category, _unit, username) => {
    const { category, unit, donorId, ...remain } = supply;
    return {
      id: Number(id),
      category: _category,
      unit: _unit,
      donor: username,
      ...remain
    }
  }

  edit = async (data) => {
    try {
      await this.supplyRepository.checkOwner({
        id: data.id,
        donorId: data.donorId
      });
      data.updatedAt = new Date();
      await this.supplyRepository.edit(data);
      const review = await this.supplyRepository.getReview({ id: data.id });
      if (review) {
        await this.supplyRepository.outdateReview({ id: data.id });
        await this.supplyRepository.updateStatus({ id: data.id, status: 0 });
      }
      const supply = await this.supplyRepository.getOne({ id: data.id });
      const category = await this.categoryGetOneService.getOne({ id: supply.category });
      const unit = await this.unitGetOneService.getOne({ id: supply.unit });
      const user = await this.userGetService.getUser({ userId: supply.donorId });
      return this.format(data.id, supply, category, unit, user.username);
    }
    catch (err) {
      throw err;
    }
  }
}