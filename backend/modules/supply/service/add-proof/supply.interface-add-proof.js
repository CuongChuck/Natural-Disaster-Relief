export default class ISupplyAddProof {
  constructor() {
    if (new.target === ISupplyAddProof) {
      throw new Error('Cannot instantiate interface.');
    }
  }

  addProof = async (data) => {
    throw new Error('Method not implemented.');
  }
};