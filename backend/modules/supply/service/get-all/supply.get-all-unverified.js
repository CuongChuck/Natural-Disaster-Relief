import ISupplyGetAllService from './supply.interface-get-all.js';

export default class SupplyGetAllUnverified extends ISupplyGetAllService {
  constructor({ supplyRedisRepository, categoryGetAllService, unitGetAllService, userGetManyService }) {
    super();
    this.supplyRepository = supplyRedisRepository;
    this.categoryGetAllService = categoryGetAllService;
    this.unitGetAllService = unitGetAllService;
    this.userGetManyService = userGetManyService;
  }

  format = (supplies, categories, units, users) => {
    return supplies.documents.map((record) => {
      const { category, unit, donorId, ...remain } = record.value;
      return {
        id: Number(record.id.split(':')[1]),
        category: categories[category] || 'N/A',
        unit: units[unit] || 'N/A',
        donor: users[donorId] || 'N/A',
        ...remain
      }
    });
  }

  getAll = async (data) => {
    try {
      const limit = parseInt(data.size, 10);
      const offset = (parseInt(data.page, 10) - 1) * limit;
      const [supplies, categories, units, count] = await Promise.all([
        this.supplyRepository.getAll({ offset, limit }),
        this.categoryGetAllService.getAll(),
        this.unitGetAllService.getAll(),
        this.supplyRepository.countAll()
      ]);
      const donorIds = [...new Set(supplies.documents.map((record) => record.value.donorId))];
      const users = await this.userGetManyService.getUsers(donorIds);
      return { supplies: this.format(supplies, categories, units, users), total_records: count };
    }
    catch (err) {
      throw err;
    }
  }
}