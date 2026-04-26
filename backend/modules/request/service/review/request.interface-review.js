export default class IRequestReviewService {
  constructor() {
    if (new.target === IRequestReviewService) {
      throw new Error('Cannot instantiate interface.');
    }
  }

  review = async (data) => {
    throw new Error('Method not implemented.');
  }
}