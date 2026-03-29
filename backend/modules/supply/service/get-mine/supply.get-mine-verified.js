import ISupplyGetMineService from './supply.interface-get-mine.js';

class SupplyGetMineVerified extends ISupplyGetMineService {
  constructor({ supplyRepository, categoryGetAllService, unitGetAllService }) {
    super();
    this.supplyRepository = supplyRepository;
    this.categoryGetAllService = categoryGetAllService;
    this.unitGetAllService = unitGetAllService;
  }

  format = (supplies, categories, units) => {
    return supplies.map((record) => {
      const { category, unit, ...remain } = record;
      return {
        category: categories[category] || 'N/A',
        unit: units[unit] || 'N/A',
        ...remain
      }
    });
  }

  getMine = async (data) => {
    try {
      const limit = parseInt(data.size, 10);
      const offset = (parseInt(data.page, 10) - 1) * limit;
      data.limit = limit;
      data.offset = offset;
      delete data.size;
      delete data.page;
      const [supplies, categories, units] = await Promise.all([
        this.supplyRepository.getMine(data),
        this.categoryGetAllService.getAll(),
        this.unitGetAllService.getAll()
      ]);
      return this.format(supplies, categories, units);
    }
    catch (err) {
      throw err;
    }
  }
}

export default SupplyGetMineVerified;