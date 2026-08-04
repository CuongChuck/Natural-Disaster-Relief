import IUserCheckService from "./users.interface-check.js";

export default class UserCheckOperator extends IUserCheckService {
  constructor({ userRepository }) {
    super();
    this.userRepository = userRepository;
  }

  checkOperator = async (data) => {
    try {
      await this.userRepository.checkOperator(data);
    } catch (err) {
      throw err;
    }
  }
};