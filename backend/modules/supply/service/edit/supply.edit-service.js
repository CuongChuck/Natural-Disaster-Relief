import ISupplyEditService from './supply.interface-edit.js';

class SupplyEditService extends ISupplyEditService {
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

  edit = async (data) => {
    try {
      await this.supplyRepository.checkOwner({
        id: data.id,
        userId: data.userId
      });
      data.updatedAt = new Date();
      const supply = await this.supplyRepository.edit(data);
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

export default SupplyEditService;