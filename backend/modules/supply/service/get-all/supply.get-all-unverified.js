import ISupplyGetAllService from './supply.interface-get-all.js';

class SupplyGetAllUnverified extends ISupplyGetAllService {
  constructor({ supplyRepository, categoryGetAllService, unitGetAllService, userGetManyService }) {
    super();
    this.supplyRepository = supplyRepository;
    this.categoryGetAllService = categoryGetAllService;
    this.unitGetAllService = unitGetAllService;
    this.userGetManyService = userGetManyService;
  }

  format = (supplies, categories, units, users) => {
    return supplies.documents.map((record) => {
      const { category, unit, userId, ...remain } = record.value;
      return {
        id: Number(record.id.split(':')[1]),
        category: categories[category] || 'N/A',
        unit: units[unit] || 'N/A',
        donor: users[userId] || 'N/A',
        ...remain
      }
    });
  }

  getAll = async () => {
    try {
      const [supplies, categories, units] = await Promise.all([
        this.supplyRepository.getAll(),
        this.categoryGetAllService.getAll(),
        this.unitGetAllService.getAll()
      ]);
      const userIds = [...new Set(supplies.documents.map((record) => record.value.userId))];
      const users = await this.userGetManyService.getUsers(userIds);
      return this.format(supplies, categories, units, users);
    }
    catch (err) {
      throw err;
    }
  }
}

export default SupplyGetAllUnverified;