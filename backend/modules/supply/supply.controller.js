class SupplyController {
  constructor({ supplyFacade }) {
    this.supplyFacade = supplyFacade;
  }

  getAll = async (req, res, next) => {
    try {
      const result = await this.supplyFacade.getAll();
      res.status(200).json({
        message: result.message,
        supplies: result.supplies
      });
    }
    catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

  create = async (req, res, next) => {
    try {
      const user = req.headers['token'];
      const data = { user, ...req.body };
      const result = await this.supplyFacade.create(data);
      res.status(201).json({
        message: result.message,
        supply: result.supply
      });
    }
    catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

  edit = async (req, res, next) => {
    try {
      const user = req.headers['token'];
      const { id } = req.params;
      const data = { id, user, ...req.body };
      const result = await this.supplyFacade.edit(data);
      res.status(201).json({
        message: result.message,
        supply: result.supply
      });
    }
    catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

  delete = async (req, res, next) => {
    try {
      const user = req.headers['token'];
      const { id } = req.params;
      const data = { id, user, ...req.body };
      const result = await this.supplyFacade.delete(data);
      res.status(204).json({ message: result.message });
    }
    catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
}

export default SupplyController;