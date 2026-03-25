import ISupplyEditService from './supply.interface-edit.js';

class SupplyEditService extends ISupplyEditService {
  constructor({ db, supplyRepository }) {
    super();
    this.supplyRepository = supplyRepository;
    this.db = db;
  }

  async edit(data) {
    const transaction = await this.db.sequelize.transaction();
    try {
      const isAuthorized = await this.supplyRepository.findByDonor(data, transaction);
      if (!isAuthorized) {
        throw new Error("User is not authorized to edit this supply");
      }
      const supply = await this.supplyRepository.edit(data, transaction);
      await transaction.commit();
      return supply;
    }
    catch (err) {
      await transaction.rollback();
      throw err;
    }
  }
}

export default SupplyEditService;