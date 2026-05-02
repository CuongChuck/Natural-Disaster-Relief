export default class DeliveryFacadeService {
  constructor(opts) {
    this.getAllService = opts.deliveryGetAllService;
    this.getMineService = opts.deliveryGetMineService;
    this.getOneService = opts.deliveryGetOneService;
    this.createService = opts.deliveryCreateService;
    this.addProofService = opts.deliveryAddProofService;
  }

  getAll = async (data) => {
    try {
      const result = await this.getAllService.getAll(data);
      return {
        message: `All deliverys retrieved successfully`,
        ...result
      };
    }
    catch (err) {
      throw err;
    }
  }
  
  getOne = async (data) => {
    try {
      const delivery = await this.getOneService.getOne(data);
      return {
        message: `Delivery ${data.id} retrieved successfully`,
        delivery
      };
    }
    catch (err) {
      throw err;
    }
  }

  getMine = async (data) => {
    try {
      const result = await this.getMineService.getMine(data);
      return {
        message: `My deliverys retrieved successfully`,
        ...result
      };
    }
    catch (err) {
      throw err;
    }
  }

  create = async (data) => {
    try {
      const delivery = await this.createService.create(data);
      return { message: `Delivery created successfully`, delivery };
    } catch (err) {
      throw err;
    }
  }

  addProof = async (data) => {
    try {
      await this.addProofService.addProof(data);
      return { message: `Delivery proof added successfully` };
    } catch (err) {
      throw err;
    }
  }
}