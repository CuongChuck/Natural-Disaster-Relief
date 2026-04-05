export const IEventStorageRepository = (Base) => class extends Base {
  getAll = async (offset, limit) => {
    throw new Error('Method not implemented.');
  }

  getMine = async (data) => {
    throw new Error('Method not implemented.');
  }

  getOne = async (data) => {
    throw new Error('Method not implemented.');
  }

  create = async (data) => {
    throw new Error('Method not implemented.');
  }
}