import IEventGetAllService from "./event.interface-get-all.js";

export default class EventGetAllService extends IEventGetAllService {
  constructor({ eventSqlRepository }) {
    super();
    this.eventRepository = eventSqlRepository;
  }

  getAll = async (data) => {
    try {
      const limit = parseInt(data.size, 10);
      const offset = (parseInt(data.page, 10) - 1) * limit;
      const [events, count] = await Promise.all([
        this.eventRepository.getAll(offset, limit),
        this.eventRepository.countAll()
      ]);
      return { events, total_records: count };
    }
    catch (err) {
      throw err;
    }
  }
}