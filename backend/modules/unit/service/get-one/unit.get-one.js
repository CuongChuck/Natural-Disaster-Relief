import IUnitGetOneService from './unit.interface-get-one.js';

class UnitGetOneService extends IUnitGetOneService {
  constructor({ unitRepository }) {
    super();
    this.unitRepository = unitRepository;
  }

  getOne = async (data) => {
    try {
      return await this.unitRepository.findOne(data);
    }
    catch (err) {
      throw err;
    }
  }
}

export default UnitGetOneService;