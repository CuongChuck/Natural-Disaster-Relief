class SupplyFacadeService {
  constructor(opts) {
    this.getAllService = opts.supplyGetAllService;
    this.getMineService = opts.supplyGetMineService;
    this.getOneService = opts.supplyGetOneService;
    this.createService = opts.supplyCreateService;
    this.editService = opts.supplyEditService;
    this.deleteService = opts.supplyDeleteService;
    this.reviewService = opts.supplyReviewService;
    this.getReviewService = opts.supplyGetReviewService;
  }

  getAll = async () => {
    try {
      const supplies = await this.getAllService.getAll();
      return {
        message: `All supplies retrieved successfully`,
        supplies
      };
    }
    catch (err) {
      throw err;
    }
  }
  
  getOne = async (data) => {
    try {
      const supply = await this.getOneService.getOne(data);
      return {
        message: `Supply ${data.id} retrieved successfully`,
        supply
      };
    }
    catch (err) {
      throw err;
    }
  }

  getMine = async (data) => {
    try {
      const supplies = await this.getMineService.getMine(data);
      return {
        message: `My supplies retrieved successfully`,
        supplies
      };
    }
    catch (err) {
      throw err;
    }
  }

  getReview = async (data) => {
    try {
      const review = await this.getReviewService.getReview(data);
      return {
        message: `Supply review ${data.id} retrieved successfully`,
        review
      };
    }
    catch (err) {
      throw err;
    }
  }

  create = async (data) => {
    try {
      const supply = await this.createService.create(data);
      return { message: `Supply created successfully`, supply };
    } catch (err) {
      throw err;
    }
  }

  review = async (data) => {
    try {
      const review = await this.reviewService.review(data);
      return { message: `Supply review created successfully`, review };
    } catch (err) {
      throw err;
    }
  }

  edit = async (data) => {
    try {
      const supply = await this.editService.edit(data);
      return {
        message: `Supply edited successfully`,
        supply
      };
    } catch (err) {
      throw err;
    }
  }

  delete = async (data) => {
    try {
      await this.deleteService.delete(data);
      return {
        message: `Supply deleted successfully`
      };
    } catch (err) {
      throw err;
    }
  }
}

export default SupplyFacadeService;