export default class DeliveryFacadeService {
  constructor(opts) {
    this.getAllService = opts.deliveryGetAllService;
    this.getMineService = opts.deliveryGetMineService;
    this.getOneService = opts.deliveryGetOneService;
    this.editService = opts.deliveryEditService;
  }

  getAll = async (data) => {
    try {
      const result = await this.getAllService.getAll(data);
      return {
        message: `All deliveries retrieved successfully`,
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
        message: `My deliveries retrieved successfully`,
        ...result
      };
    }
    catch (err) {
      throw err;
    }
  }

  edit = async (data) => {
    try {
      await this.editService.edit(data);
      return { message: `Delivery edited successfully` };
    } catch (err) {
      throw err;
    }
  }
}