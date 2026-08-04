export default class IUserCheckService {
  constructor() {
    if (new.target === IUserCheckService) {
      throw new Error('Cannot instantiate interface.');
    }
  }

  checkOperator = async (data) => {
    throw new Error('Method not implemented.');
  }
};