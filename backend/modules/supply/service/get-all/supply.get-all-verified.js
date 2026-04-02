import ISupplyGetAllService from './supply.interface-get-all.js';

export default class SupplyGetAllVerified extends ISupplyGetAllService {
  constructor({ supplySqlRepository, categoryGetAllService, unitGetAllService }) {
    super();
    this.supplyRepository = supplySqlRepository;
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

  getAll = async (data) => {
    try {
      const limit = parseInt(data.size, 10);
      const offset = (parseInt(data.page, 10) - 1) * limit;
      const [supplies, categories, units] = await Promise.all([
        this.supplyRepository.getAll({ offset, limit }),
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