export const IEventCacheRepository = (Base) => class extends Base {
  getNames = async () => {
    throw new Error('Method not implemented.');
  }

  getName = async (data) => {
    throw new Error('Method not implemented.');
  }
}