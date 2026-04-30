class ISupplyRepository {
  constructor() {
    if (new.target === ISupplyRepository) {
      throw new Error('Cannot instantiate interface.');
    }
  }

  getAll = async (data) => {
    throw new Error('Method not implemented.');
  }

  countAll = async () => {
    throw new Error('Method not implemented.');
  }

  getOne = async (data) => {
    throw new Error('Method not implemented.');
  }

  getReview = async (data) => {
    throw new Error('Method not implemented.');
  }

  getMine = async (data) => {
    throw new Error('Method not implemented.');
  }

  countMine = async (data) => {
    throw new Error('Method not implemented.');
  }
}

export default ISupplyRepository;