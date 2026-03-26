class ISupplyGetReviewService {
  constructor() {
    if (new.target === ISupplyGetReviewService) {
      throw new Error('Cannot instantiate interface.');
    }
  }

  getOne = async (data) => {
    throw new Error('Method not implemented.');
  }
}

export default ISupplyGetReviewService;