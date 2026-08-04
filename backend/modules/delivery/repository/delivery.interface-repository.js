export default class IDeliveryRepository {
  constructor() {
    if (new.target === IDeliveryRepository) {
      throw new Error('Cannot instantiate interface.');
    }
  }

  checkOwner = async (data) => {
    throw new Error('Method not implemented.');
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

  getMine = async (data) => {
    throw new Error('Method not implemented.');
  }

  countMine = async (data) => {
    throw new Error('Method not implemented.');
  }

  create = async (data) => {
    throw new Error('Method not implemented.');
  }

  addProof = async (data) => {
    throw new Error('Method not implemented.');
  }
}