export default class EventController {
  constructor({ eventFacade }) {
    this.eventFacade = eventFacade;
  }

  getNames = async (req, res, next) => {
    try {
      const result = await this.eventFacade.getNames();
      res.status(200).json(result);
    }
    catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

  getAll = async (req, res, next) => {
    try {
      let { page = 1, size = 100 } = req.query;
      const result = await this.eventFacade.getAll({ page, size });
      res.status(200).json(result);
    }
    catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

  getMine = async (req, res, next) => {
    try {
      let { page = 1, size = 100 } = req.query;
      const result = await this.eventFacade.getMine({ userId: req.userId, page, size });
      res.status(200).json(result);
    }
    catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

  getOne = async (req, res, next) => {
    try {
      let { page = 1, size = 100 } = req.query;
      const { id } = req.params;
      const result = await this.eventFacade.getOne({ id, page, size });
      res.status(200).json(result);
    }
    catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

  create = async (req, res, next) => {
    try {
      const data = { userId: req.userId, ...req.body }
      const result = await this.eventFacade.create(data);
      res.status(201).json(result);
    }
    catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
}