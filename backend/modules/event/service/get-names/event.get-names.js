import IEventGetNamesService from './event.interface-get-names.js';

export default class EventGetNamesService extends IEventGetNamesService {
  constructor({ eventSqlRepository }) {
    super();
    this.eventSql = eventSqlRepository;
  }

  getNames = async () => {
    try {
      const result = await this.eventSql.getNames();
      delete result[1];
      delete result[2];
      return result;
    }
    catch (err) {
      throw err;
    }
  }
}