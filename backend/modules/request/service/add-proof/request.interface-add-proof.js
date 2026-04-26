export default class IRequestAddProof {
  constructor() {
    if (new.target === IRequestAddProof) {
      throw new Error('Cannot instantiate interface.');
    }
  }

  addProof = async (data) => {
    throw new Error('Method not implemented.');
  }
};