export default class IRequestGetReviewService {
  constructor() {
    if (new.target === IRequestGetReviewService) {
      throw new Error('Cannot instantiate interface.');
    }
  }

  getOne = async (data) => {
    throw new Error('Method not implemented.');
  }
}