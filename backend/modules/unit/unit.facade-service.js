class UnitFacadeService {
  constructor({ unitGetAllService }) {
    this.getAllService = unitGetAllService;
  }

  getAll = async () => {
    try {
      const units = await this.getAllService.getAll();
      return {
        message: `Units retrieved via all strategy successfully`,
        units
      };
    }
    catch (err) {
      throw err;
    }
  }
}

export default UnitFacadeService;