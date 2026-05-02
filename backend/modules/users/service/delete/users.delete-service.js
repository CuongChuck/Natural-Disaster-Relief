import IUserDeleteService from './users.interface-delete.js';

class UserDeleteService extends IUserDeleteService {
  constructor({ userRepository }) {
    super();
    this.userRepository = userRepository;
  }

  async deleteUser(data) {
    try {
      await this.userRepository.deleteUser(data, transaction);
    }
    catch (err) {
      throw err;
    }
  }
}

export default UserDeleteService;