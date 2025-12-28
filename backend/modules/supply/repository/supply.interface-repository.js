class ISupplyRepository {
  constructor() {
    if (new.target === ISupplyRepository) {
      throw new Error('Cannot instantiate interface.');
    }
  }

  async findAll(transaction) {
    throw new Error('Method not implemented.');
  }

  async create(data, transaction) {
    throw new Error('Method not implemented.');
  }

  async edit(data, transaction) {
    throw new Error('Method not implemented.');
  }

  async delete(data, transaction) {
    throw new Error('Method not implemented.');
  }
}

export default ISupplyRepository;