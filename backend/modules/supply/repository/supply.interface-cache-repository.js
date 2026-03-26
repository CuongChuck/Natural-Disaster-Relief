export const ISupplyCacheRepository = (Base) => class extends Base {
  edit = async (data) => {
    throw new Error('Method not implemented.');
  }

  delete = async (data) => {
    throw new Error('Method not implemented.');
  }

  checkOwner = async (data) => {
    throw new Error('Method not implemented.');
  }
};