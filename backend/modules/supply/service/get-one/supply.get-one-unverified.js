import ISupplyGetOneService from './supply.interface-get-one.js';

class SupplyGetOneUnverified extends ISupplyGetOneService {
  constructor({ supplyRepository, categoryGetOneService, unitGetOneService, userGetService }) {
    super();
    this.supplyRepository = supplyRepository;
    this.categoryGetOneService = categoryGetOneService;
    this.unitGetOneService = unitGetOneService;
    this.userGetService = userGetService;
  }

  format = (id, supply, _category, _unit, username) => {
    const { category, unit, userId, ...remain } = supply;
    return {
      id: Number(id),
      category: _category,
      unit: _unit,
      donor: username,
      ...remain
    }
  }

  getOne = async (data) => {
    try {
      const supply = await this.supplyRepository.getOne(data);
      const category = await this.categoryGetOneService.getOne({ id: supply.category });
      const unit = await this.unitGetOneService.getOne({ id: supply.unit });
      const user = await this.userGetService.getUser({ userId: supply.userId });
      return this.format(data.id, supply, category, unit, user.username);
    }
    catch (err) {
      throw err;
    }
  }
}

export default SupplyGetOneUnverified;