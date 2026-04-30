import ISupplyEditService from './supply.interface-edit.js';

export default class SupplyAcceptService extends ISupplyEditService {
  constructor({ supplySqlRepository, userCheckService }) {
    super();
    this.supplyRepository = supplySqlRepository;
    this.userCheckService = userCheckService;
  }

  edit = async (data) => {
    try {
      await this.userCheckService.checkOperator({ userId: data.userId });
      await this.supplyRepository.updateStatus({ id: data.id, status: 3 });
    }
    catch (err) {
      throw err;
    }
  }
}