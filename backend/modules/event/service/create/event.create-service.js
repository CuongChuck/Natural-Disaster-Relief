import IEventCreateService from "./event.interface-create.js";

export default class EventCreateService extends IEventCreateService {
  constructor({ eventSqlRepository, userCheckService }) {
    super();
    this.eventRepository = eventSqlRepository;
    this.userCheckService = userCheckService;
  }

  create = async (data) => {
    try {
      await this.userCheckService.checkOperator({ userId: data.userId });
      const event = await this.eventRepository.create(data);
      return await this.eventRepository.getOne({ id: event.id });
    } catch (err) {
      throw err;
    }
  }
}