class ISupplyReviewService {
  constructor() {
    if (new.target === ISupplyReviewService) {
      throw new Error('Cannot instantiate interface.');
    }
  }

  review = async (data) => {
    throw new Error('Method not implemented.');
  }
}

export default ISupplyReviewService;