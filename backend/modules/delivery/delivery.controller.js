export default class DeliveryController {
  constructor({ deliveryFacade }) {
    this.deliveryFacade = deliveryFacade;
  }

  getAll = async (req, res, next) => {
    try {
      let { page = 1, size = 100 } = req.query;
      const data = { page, size };
      const result = await this.deliveryFacade.getAll(data);
      res.status(200).json(result);
    }
    catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  getOne = async (req, res, next) => {
    try {
      const data = { id: req.params.id };
      const result = await this.deliveryFacade.getOne(data);
      res.status(200).json(result);
    }
    catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  getMine = async (req, res, next) => {
    try {
      let { page = 1, size = 100 } = req.query;
      const data = { operatorId: req.userId, page, size }
      const result = await this.deliveryFacade.getMine(data);
      res.status(200).json(result);
    }
    catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  edit = async (req, res, next) => {
    try {
      const { id } = req.params;
      const data = { id, userId: req.userId, ...req.body };
      const result = await this.deliveryFacade.edit(data);
      res.status(201).json(result);
    }
    catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
}