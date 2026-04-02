export default class EventFacadeService {
  constructor(opts) {
    this.getNamesService = opts.eventGetNamesService;
    this.getAllService = opts.eventGetAllService;
    this.getOneService = opts.eventGetOneService;
    this.createService = opts.eventCreateService;
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

  getAll = async (page, size) => {
    try {
      const events = await this.getAllService.getAll(page, size);
      return {
        message: `All events retrieved successfully`,
        events,
        total_records: events.length
      };
    }
    catch (err) {
      throw err;
    }
  }

  getOne = async (data) => {
    try {
      const result = await this.getOneService.getOne(data);
      return {
        message: `Event ${data.id} retrieved successfully`,
        event: result.event,
        user: result.user,
        supplies: result.supplies,
        total_supplies: result.supplies.length
      };
    }
    catch (err) {
      throw err;
    }
  }

  create = async (data) => {
    try {
      const result = await this.createService.create(data);
      return {
        message: `Event created successfully`,
        event: result.event,
        user: result.user,
        supplies: result.supplies,
        total_supplies: result.supplies.length
      };
    }
    catch (err) {
      throw err;
    }
  }
}