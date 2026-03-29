import ISupplyGetOneService from './supply.interface-get-one.js';

class SupplyGetOneVerified extends ISupplyGetOneService {
  constructor({ supplyRepository, categoryGetOneService, unitGetOneService }) {
    super();
    this.supplyRepository = supplyRepository;
    this.categoryGetOneService = categoryGetOneService;
    this.unitGetOneService = unitGetOneService;
  }

  format = (supply, _category, _unit) => {
    const { category, unit, ...remain } = supply;
    return {
      category: _category,
      unit: _unit,
      ...remain
    }
  }

  getOne = async (data) => {
    try {
      const supply = await this.supplyRepository.getOne({ id: data.id });
      const [category, unit] = await Promise.all([
        this.categoryGetOneService.getOne({ id: supply.category }),
        this.unitGetOneService.getOne({ id: supply.unit })
      ]);
      return this.format(supply, category, unit);
    }
    catch (err) {
      throw err;
    }
  }
}

export default SupplyGetOneVerified;