import IUserGetMany from "./users.interface-get-many.js";

export default class UserGetMany extends IUserGetMany {
  constructor({ userRepository }) {
    super();
    this.userRepository = userRepository;
  }

  format = (data) => {
    return Object.fromEntries(data.map((record) => [record.id, record.username]));
  }

  getUsers = async (data) => {
    try {
      return this.format(await this.userRepository.getUsers(data));
    } catch (err) {
      throw err;
    }
  }
};