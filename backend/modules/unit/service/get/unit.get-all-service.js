import IUnitGetService from './unit.interface-get.js';

class UnitGetAllService extends IUnitGetService {
  constructor({ unitRepository }) {
    super();
    this.unitRepository = unitRepository;
  }

  async getAll() {
    try {
      return await this.unitRepository.findAll();
    }
    catch (err) {
      throw err;
    }
  }
}

export default UnitGetAllService;