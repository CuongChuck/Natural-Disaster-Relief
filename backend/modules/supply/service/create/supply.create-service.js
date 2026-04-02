import ISupplyCreateService from './supply.interface-create.js';

export default class SupplyCreateService extends ISupplyCreateService {
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

  create = async (data) => {
    try {
      data.createdAt = new Date();
      data.updatedAt = new Date();
      data.donorId = data.userId;
      delete data.userId;
      const id = await this.supplyRepository.create(data);
      const supply = await this.supplyRepository.getOne({ id });
      const category = await this.categoryGetOneService.getOne({ id: supply.category });
      const unit = await this.unitGetOneService.getOne({ id: supply.unit });
      const user = await this.userGetService.getUser({ userId: supply.donorId });
      return this.format(id, supply, category, unit, user.username);
    }
    catch (err) {
      throw err;
    }
  }
}