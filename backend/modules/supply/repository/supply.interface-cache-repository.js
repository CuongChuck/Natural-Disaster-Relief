export const ISupplyCacheRepository = (Base) => class extends Base {
  review = async (data) => {
    throw new Error('Method not implemented.');
  }

  outdateReview = async (data) => {
    throw new Error('Method not implemented.');
  }
  
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