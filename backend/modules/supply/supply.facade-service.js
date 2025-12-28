class SupplyFacadeService {
  constructor({
    supplyGetAllService,
    supplyCreateService,
    supplyEditService,
    supplyDeleteService
  }) {
    this.getStrategy = {
      all: supplyGetAllService
    };

    this.createStrategy = {
      normal: supplyCreateService
    }

    this.editStrategy = {
      nonAdmin: supplyEditService
    }

    this.deleteStrategy = {
      nonAdmin: supplyDeleteService
    }
  }

  async getAll() {
    try {
      const strategy = this.getStrategy.all;
      const supplies = await strategy.getAll();
      return {
        message: `Supplies retrieved via all strategy successfully`,
        supplies: supplies
      };
    }
    catch (err) {
      throw err;
    }
  }

  async create(data) {
    try {
      const strategy = this.createStrategy[data.strategy];
      const supply = await strategy.create(data);
      return {
        message: `Supply create via ${data.strategy} strategy successfully`,
        supply
      };
    } catch (err) {
      throw err;
    }
  }

  async edit(data) {
    try {
      const strategy = this.editStrategy[data.strategy];
      const supply = await strategy.edit(data);
      return {
        message: `Supply edit via ${data.strategy} strategy successfully`,
        supply
      };
    } catch (err) {
      throw err;
    }
  }

  async delete(data) {
    try {
      const strategy = this.deleteStrategy[data.strategy];
      await strategy.delete(data);
      return {
        message: `Supply deletion via ${data.strategy} strategy successfully`
      };
    } catch (err) {
      throw err;
    }
  }
}

export default SupplyFacadeService;