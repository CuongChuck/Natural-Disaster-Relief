class UnitController {
  constructor({ unitFacade }) {
    this.unitFacade = unitFacade;
  }

  getAll = async (req, res, next) => {
    try {
      const result = await this.unitFacade.getAll();
      res.status(200).json({
        message: result.message,
        units: result.units
      });
    }
    catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
}

export default UnitController;