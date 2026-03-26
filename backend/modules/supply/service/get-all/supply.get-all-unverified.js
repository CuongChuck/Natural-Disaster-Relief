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

  getAll = async () => {
    try {
      const [supplies, categories, units] = await Promise.all([
        this.supplyRepository.getAll(),
        this.categoryGetAllService.getAll(),
        this.unitGetAllService.getAll()
      ]);
      const donorIds = [...new Set(supplies.documents.map((record) => record.value.donorId))];
      const users = await this.userGetManyService.getUsers(donorIds);
      return this.format(supplies, categories, units, users);
    }
    catch (err) {
      throw err;
    }
  }
}

export default SupplyGetAllUnverified;