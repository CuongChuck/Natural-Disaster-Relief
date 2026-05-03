import IEventGetNamesService from "./event.interface-get-names.js";

export default class EventGetNamesService extends IEventGetNamesService {
  constructor({ eventRedisRepository }) {
    super();
    this.eventRepository = eventRedisRepository;
  }

  getNames = async () => {
    try {
      return await this.eventRepository.getNames();
    }
    catch (err) {
      throw err;
    }
  }
}