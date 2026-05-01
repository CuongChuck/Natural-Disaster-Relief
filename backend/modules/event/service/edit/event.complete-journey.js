import IEventEditService from "./event.interface-edit.js";

export default class EventCompleteJourney extends IEventEditService {
  constructor({ eventSqlRepository, userCheckService }) {
    super();
    this.eventRepository = eventSqlRepository;
    this.userCheckService = userCheckService;
  }

  edit = async (data) => {
    try {
      await this.eventRepository.updateJourneyStatus({ id: data.id, status: true });
      return await this.eventRepository.getOne({ id: data.id });
    } catch (err) {
      throw err;
    }
  }
}