export default class MapFacadeService {
  constructor(opts) {
    this.createDisasterService = opts.mapCreateDisaster;
    this.getOneDisasterService = opts.mapGetOneDisaster;
    this.getAllDisastersService = opts.mapGetAllDisasters;
    this.getDisasterTypesService = opts.mapGetDisasterTypes;
    this.editDisasterService = opts.mapEditDisaster;
    this.deleteDisasterService = opts.mapDeleteDisaster;
    this.getMyDisasterService = opts.mapGetMyDisasters;
  }

  createDisaster = async (data) => {
    try {
      const disaster = await this.createDisasterService.create(data);
      return {
        message: 'Disaster created successfully',
        disaster
      };
    } catch (err) {
      throw err;
    }
  }

  editDisaster = async (data) => {
    try {
      const disaster = await this.editDisasterService.edit(data);
      return {
        message: 'Disaster edited successfully',
        disaster
      };
    } catch (err) {
      throw err;
    }
  }

  deleteDisaster = async (data) => {
    try {
      await this.deleteDisasterService.delete(data);
      return {
        message: 'Disaster deleted successfully'
      };
    } catch (err) {
      throw err;
    }
  }

  getOneDisaster = async (data) => {
    try {
      const disaster = await this.getOneDisasterService.getOne(data);
      return {
        message: `Disaster ${data.id} retrieved successfully`,
        disaster
      };
    } catch (err) {
      throw err;
    }
  }

  getAllDisasters = async (data) => {
    try {
      const result = await this.getAllDisastersService.getAll(data);
      return {
        message: `All disasters retrieved successfully`,
        ...result
      };
    } catch (err) {
      throw err;
    }
  }

  getMyDisasters = async (data) => {
    try {
      const result = await this.getMyDisasterService.getMine(data);
      return {
        message: `All my disasters retrieved successfully`,
        ...result
      };
    } catch (err) {
      throw err;
    }
  }

  getDisasterTypes = async () => {
    try {
      const types = await this.getDisasterTypesService.getTypes();
      return {
        message: `All disaster types retrieved successfully`,
        types
      };
    } catch (err) {
      throw err;
    }
  }
}