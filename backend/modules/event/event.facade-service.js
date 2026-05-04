export default class EventFacadeService {
  constructor(opts) {
    this.getAllService = opts.eventGetAllService;
    this.getOneService = opts.eventGetOneService;
    this.createService = opts.eventCreateService;
    this.getMineService = opts.eventGetMineService;
    this.editService = opts.eventEditService;
    this.getNamesService = opts.eventGetNamesService;
    this.deleteService = opts.eventDeleteService;
  }

  getNames = async () => {
    try {
      const names = await this.getNamesService.getNames();
      return {
        message: `All events retrieved successfully`,
        names
      };
    }
    catch (err) {
      throw err;
    }
  }

  getAll = async (data) => {
    try {
      const result = await this.getAllService.getAll(data);
      return {
        message: `All events retrieved successfully`,
        ...result
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
        message: `My events retrieved successfully`,
        ...result
      };
    }
    catch (err) {
      throw err;
    }
  }

  getOne = async (data) => {
    try {
      const event = await this.getOneService.getOne(data);
      return {
        message: `Event ${data.id} retrieved successfully`,
        event
      };
    }
    catch (err) {
      throw err;
    }
  }

  create = async (data) => {
    try {
      const event = await this.createService.create(data);
      return {
        message: `Event created successfully`,
        event
      };
    }
    catch (err) {
      throw err;
    }
  }

  edit = async (data) => {
    try {
      const event = await this.editService.edit(data);
      return {
        message: `Event edited successfully`,
        event
      };
    }
    catch (err) {
      throw err;
    }
  }

  delete = async (data) => {
    try {
      await this.deleteService.delete(data);
      return { message: `Event deleted successfully` };
    }
    catch (err) {
      throw err;
    }
  }
}