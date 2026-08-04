export default class MapController {
  constructor({ mapFacade }) {
    this.mapFacade = mapFacade;
  }

  createDisaster = async (req, res, next) => {
    try {
      const result = await this.mapFacade.createDisaster({ userId: req.userId, ...req.body });
      res.status(201).json(result);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  editDisaster = async (req, res, next) => {
    try {
      const result = await this.mapFacade.editDisaster({
        id: req.params.id,
        userId: req.userId,
        ...req.body
      });
      res.status(201).json(result);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  getOneDisaster = async (req, res, next) => {
    try {
      const result = await this.mapFacade.getOneDisaster({ id: req.params.id });
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  getAllDisaster = async (req, res, next) => {
    try {
      let { page = 1, size = 100 } = req.query;
      const result = await this.mapFacade.getAllDisasters({ page, size });
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  getMyDisasters = async (req, res, next) => {
    try {
      let { page = 1, size = 100 } = req.query;
      const result = await this.mapFacade.getMyDisasters({ userId: req.userId, page, size });
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  getDisasterTypes = async (req, res, next) => {
    try {
      const result = await this.mapFacade.getDisasterTypes();
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  deleteDisaster = async (req, res, next) => {
    try {
      const result = await this.mapFacade.deleteDisaster({
        id: req.params.id,
        userId: req.userId
      });
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
}