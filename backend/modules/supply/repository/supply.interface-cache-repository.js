export const ISupplyCacheRepository = (Base) => class extends Base {
  getStatus = async () => {
    throw new Error('Method not implemented.');
  }
};