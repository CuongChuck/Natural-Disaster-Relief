export default class RequestController {
  constructor({ requestFacade }) {
    this.requestFacade = requestFacade;
  }

  getAll = async (req, res, next) => {
    try {
      let { page = 1, size = 100, type = null } = req.query;
      const data = { page, size, type };
      const result = await this.requestFacade.getAll(data);
      res.status(200).json(result);
    }
    catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  getStatus = async (req, res, next) => {
    try {
      const result = await this.requestFacade.getStatus();
      res.status(200).json(result);
    }
    catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  getOne = async (req, res, next) => {
    try {
      const data = { id: req.params.id };
      const result = await this.requestFacade.getOne(data);
      res.status(200).json(result);
    }
    catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  getReview = async (req, res, next) => {
    try {
      const data = { id: req.params.id };
      const result = await this.requestFacade.getReview(data);
      res.status(200).json(result);
    }
    catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  getMine = async (req, res, next) => {
    try {
      let { page = 1, size = 100, type = null } = req.query;
      const data = { recipientId: req.userId, page, size, type }
      const result = await this.requestFacade.getMine(data);
      res.status(200).json(result);
    }
    catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  addProof = async (req, res, next) => {
    try {
      const { id } = req.params;
      const data = { id, recipientId: req.userId, ...req.body };
      const result = await this.requestFacade.addProof(data);
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
      const result = await this.requestFacade.review(data);
      res.status(201).json(result);
    }
    catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  create = async (req, res, next) => {
    try {
      const data = { recipientId: req.userId, ...req.body }
      const result = await this.requestFacade.create(data);
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
      const result = await this.requestFacade.accept(data);
      res.status(201).json(result);
    }
    catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  edit = async (req, res, next) => {
    try {
      const { id } = req.params;
      const data = { id, recipientId: req.userId, ...req.body };
      const result = await this.requestFacade.edit(data);
      res.status(201).json(result);
    }
    catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  delete = async (req, res, next) => {
    try {
      const { id } = req.params;
      const data = { id, recipientId: req.userId };
      const result = await this.requestFacade.delete(data);
      res.status(200).json(result);
    }
    catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
}