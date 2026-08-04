import IUserGetMany from "./users.interface-get-many.js";

export default class UserGetMany extends IUserGetMany {
  constructor({ userRepository }) {
    super();
    this.userRepository = userRepository;
  }

  getUsers = async (data) => {
    try {
      await this.userRepository.checkOperator(data);
      return await this.userRepository.getUsers(data);
    } catch (err) {
      throw err;
    }
  }
};