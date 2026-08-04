import IEventGetOneService from './event.interface-get-one.js';

export default class EventGetOneService extends IEventGetOneService {
  constructor({ eventSqlRepository }) {
    super();
    this.eventRepository = eventSqlRepository;
  }

  getOne = async (data) => {
    try {
      return await this.eventRepository.getOne(data);
    }
    catch (err) {
      throw err;
    }
  }
}