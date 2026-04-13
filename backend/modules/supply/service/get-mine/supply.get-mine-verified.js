import ISupplyGetMineService from './supply.interface-get-mine.js';

export default class SupplyGetMineVerified extends ISupplyGetMineService {
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

  getMine = async (data) => {
    try {
      const limit = parseInt(data.size, 10);
      const offset = (parseInt(data.page, 10) - 1) * limit;
      data.limit = limit;
      data.offset = offset;
      delete data.size;
      delete data.page;
      const [supplies, categories, units, count] = await Promise.all([
        this.supplyRepository.getMine(data),
        this.categoryGetAllService.getAll(),
        this.unitGetAllService.getAll(),
        this.supplyRepository.countMine(data)
      ]);
      return { supplies: this.format(supplies, categories, units), total_records: count };
    }
    catch (err) {
      throw err;
    }
  }
}