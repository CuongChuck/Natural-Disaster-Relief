export default class IDeliveryAddProof {
  constructor() {
    if (new.target === IDeliveryAddProof) {
      throw new Error('Cannot instantiate interface.');
    }
  }

  addProof = async (data) => {
    throw new Error('Method not implemented.');
  }
};