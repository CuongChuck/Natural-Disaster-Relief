import IEventGetNamesService from './event.interface-get-names.js';

export default class EventGetNamesService extends IEventGetNamesService {
  constructor({ eventRedisRepository }) {
    super();
    this.eventRepository = eventRedisRepository;
  }

  getNames = async () => {
    try {
      const result = await this.eventRepository.getNames();
      delete result[1];
      delete result[2];
      delete result[3];
      return result;
    }
    catch (err) {
      throw err;
    }
  }
}