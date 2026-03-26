import ISupplyGetMineService from './supply.interface-get-mine.js';

class SupplyGetMineUnverified extends ISupplyGetMineService {
  constructor({ supplyRepository, categoryGetAllService, unitGetAllService, userGetService }) {
    super();
    this.supplyRepository = supplyRepository;
    this.categoryGetAllService = categoryGetAllService;
    this.unitGetAllService = unitGetAllService;
    this.userGetService = userGetService;
  }

  format = (supplies, categories, units, username) => {
    return supplies.documents.map((record) => {
      const { category, unit, donorId, ...remain } = record.value;
      return {
        id: Number(record.id.split(':')[1]),
        category: categories[category] || 'N/A',
        unit: units[unit] || 'N/A',
        donor: username,
        ...remain
      }
    });
  }

  getMine = async (data) => {
    try {
      const [supplies, categories, units, user] = await Promise.all([
        this.supplyRepository.getMine(data),
        this.categoryGetAllService.getAll(),
        this.unitGetAllService.getAll(),
        this.userGetService.getUser(data)
      ]);
      return this.format(supplies, categories, units, user.username);
    }
    catch (err) {
      throw err;
    }
  }
}

export default SupplyGetMineUnverified;