export default class IUserGetMany {
  constructor() {
    if (new.target === IUserGetMany) {
      throw new Error('Cannot instantiate interface.');
    }
  }

  getUsers = async (data) => {
    throw new Error('Method not implemented.');
  }
};