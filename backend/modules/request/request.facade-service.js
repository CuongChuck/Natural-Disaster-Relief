export default class RequestFacadeService {
  constructor(opts) {
    this.getAllService = opts.requestGetAllService;
    this.getStatusService = opts.requestGetStatusService;
    this.getMineService = opts.requestGetMineService;
    this.getOneService = opts.requestGetOneService;
    this.createService = opts.requestCreateService;
    this.editService = opts.requestEditService;
    this.deleteService = opts.requestDeleteService;
    this.reviewService = opts.requestReviewService;
    this.getReviewService = opts.requestGetReviewService;
    this.addProofService = opts.requestAddProofService;
  }

  getAll = async (data) => {
    try {
      const result = await this.getAllService.getAll(data);
      return {
        message: `All requests retrieved successfully`,
        ...result
      };
    }
    catch (err) {
      throw err;
    }
  }

  getStatus = async () => {
    try {
      const status = await this.getStatusService.getStatus();
      return {
        message: `All request status successfully`,
        status
      };
    }
    catch (err) {
      throw err;
    }
  }
  
  getOne = async (data) => {
    try {
      const request = await this.getOneService.getOne(data);
      return {
        message: `Request ${data.id} retrieved successfully`,
        request
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
        message: `My requests retrieved successfully`,
        ...result
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
        message: `Request review ${data.id} retrieved successfully`,
        review
      };
    }
    catch (err) {
      throw err;
    }
  }

  create = async (data) => {
    try {
      const request = await this.createService.create(data);
      return { message: `Request created successfully`, request };
    } catch (err) {
      throw err;
    }
  }

  review = async (data) => {
    try {
      const review = await this.reviewService.review(data);
      return { message: `Request review created successfully`, review };
    } catch (err) {
      throw err;
    }
  }

  addProof = async (data) => {
    try {
      await this.addProofService.addProof(data);
      return { message: `Request proof added successfully` };
    } catch (err) {
      throw err;
    }
  }

  edit = async (data) => {
    try {
      const request = await this.editService.edit(data);
      return {
        message: `Request edited successfully`,
        request
      };
    } catch (err) {
      throw err;
    }
  }

  accept = async (data) => {
    try {
      await this.editService.edit(data);
      return {
        message: `Request accepted successfully`
      };
    } catch (err) {
      throw err;
    }
  }

  delete = async (data) => {
    try {
      await this.deleteService.delete(data);
      return {
        message: `Request deleted successfully`
      };
    } catch (err) {
      throw err;
    }
  }
}