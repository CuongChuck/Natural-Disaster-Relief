class UnitFacadeService {
  constructor({ unitGetAllService }) {
    this.getStrategy = {
      all: unitGetAllService
    };
  }

  async getAll() {
    try {
      const strategy = this.getStrategy.all;
      const units = await strategy.getAll();
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