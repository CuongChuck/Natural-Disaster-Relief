import ISupplyEditService from './supply.interface-edit.js';

export default class SupplyEditService extends ISupplyEditService {
  constructor({ supplySqlRepository }) {
    super();
    this.supplyRepository = supplySqlRepository;
  }

  edit = async (data) => {
    try {
      await this.supplyRepository.checkOwner({
        id: data.id,
        donorId: data.donorId
      });
      await this.supplyRepository.edit(data);
      return await this.supplyRepository.getOne({ id: data.id });
    }
    catch (err) {
      throw err;
    }
  }
}