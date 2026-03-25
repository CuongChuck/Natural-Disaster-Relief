import IUserGetService from './users.interface-get.js';

class UserGetService extends IUserGetService {
  constructor({ userRepository }) {
    super();
    this.userRepository = userRepository;
  }

  async getUser(data) {
    try {
      return await this.userRepository.getUser(data);
    }
    catch (err) {
      throw err;
    }
  }
}

export default UserGetService;