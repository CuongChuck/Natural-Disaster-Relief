import IEventGetMineService from "./event.interface-get-mine.js";

export default class EventGetMineService extends IEventGetMineService {
  constructor({ eventSqlRepository }) {
    super();
    this.eventRepository = eventSqlRepository;
  }

  getMine = async (data) => {
    try {
      const limit = parseInt(data.size, 10);
      const offset = (parseInt(data.page, 10) - 1) * limit;
      const [events, count] = await Promise.all([
        this.eventRepository.getMine({ userId: data.userId, limit, offset }),
        this.eventRepository.countMine({ userId: data.userId })
      ]);
      return { events, total_records: count };
    }
    catch (err) {
      throw err;
    }
  }
}