export const IRequestCacheRepository = (Base) => class extends Base {
  getStatus = async () => {
    throw new Error('Method not implemented.');
  }
};