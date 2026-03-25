class ISupplyRepository {
  constructor() {
    if (new.target === ISupplyRepository) {
      throw new Error('Cannot instantiate interface.');
    }
  }

  getAll = async () => {
    throw new Error('Method not implemented.');
  }

  getOne = async (data) => {
    throw new Error('Method not implemented.');
  }

  getMine = async (data) => {
    throw new Error('Method not implemented.');
  }

  create = async (data) => {
    throw new Error('Method not implemented.');
  }
}

export default ISupplyRepository;