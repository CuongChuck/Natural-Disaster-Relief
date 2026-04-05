export const IMapStorageRepository = (Base) => class extends Base {
  getAllDisasters = async (offset, limit) => {
    throw new Error('Method not implemented.');
  }

  getOneDisaster = async (data) => {
    throw new Error('Method not implemented.');
  }

  createDisaster = async (data) => {
    throw new Error('Method not implemented.');
  }
}