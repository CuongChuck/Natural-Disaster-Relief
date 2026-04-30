export default class SupplyController {
  constructor({ supplyFacade }) {
    this.supplyFacade = supplyFacade;
  }

  getStatus = async (req, res, next) => {
    try {
      const result = await this.supplyFacade.getStatus();
      res.status(200).json(result);
    }
    catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  getAll = async (req, res, next) => {
    try {
      let { page = 1, size = 100 } = req.query;
      const data = { page, size, status: req.status, order: req.order };
      const result = await this.supplyFacade.getAll(data);
      res.status(200).json(result);
    }
    catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  getOne = async (req, res, next) => {
    try {
      const data = { id: req.params.id };
      const result = await this.supplyFacade.getOne(data);
      res.status(200).json(result);
    }
    catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  getReview = async (req, res, next) => {
    try {
      const data = { id: req.params.id };
      const result = await this.supplyFacade.getReview(data);
      res.status(200).json(result);
    }
    catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  getMine = async (req, res, next) => {
    try {
      let { page = 1, size = 100 } = req.query;
      const data = { donorId: req.userId, page, size, status: req.status, order: req.order };
      const result = await this.supplyFacade.getMine(data);
      res.status(200).json(result);
    }
    catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  addProof = async (req, res, next) => {
    try {
      const { id } = req.params;
      const data = { id, userId: req.userId, ...req.body };
      const result = await this.supplyFacade.addProof(data);
      res.status(201).json(result);
    }
    catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  review = async (req, res, next) => {
    try {
      const { id } = req.params;
      const data = { id, reviewerId: req.userId, ...req.body }
      const result = await this.supplyFacade.review(data);
      res.status(201).json(result);
    }
    catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  create = async (req, res, next) => {
    try {
      const { id } = req.params;
      const data = { id, donorId: req.userId, ...req.body }
      const result = await this.supplyFacade.create(data);
      res.status(201).json(result);
    }
    catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  accept = async (req, res, next) => {
    try {
      const { id } = req.params;
      const data = { id, userId: req.userId }
      const result = await this.supplyFacade.accept(data);
      res.status(201).json(result);
    }
    catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  edit = async (req, res, next) => {
    try {
      const { id } = req.params;
      const data = { id, donorId: req.userId, ...req.body };
      const result = await this.supplyFacade.edit(data);
      res.status(201).json(result);
    }
    catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  delete = async (req, res, next) => {
    try {
      const { id } = req.params;
      const data = { id, donorId: req.userId };
      const result = await this.supplyFacade.delete(data);
      res.status(200).json(result);
    }
    catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
}