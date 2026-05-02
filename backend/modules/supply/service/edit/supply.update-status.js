import ISupplyEditService from './supply.interface-edit.js';

export default class SupplyUpdateStatus extends ISupplyEditService {
  constructor({ supplySqlRepository }) {
    super();
    this.supplyRepository = supplySqlRepository;
  }

  edit = async (data) => {
    try {
      await this.supplyRepository.updateStatus({ id: data.id, status: data.status });
    }
    catch (err) {
      throw err;
    }
  }
}