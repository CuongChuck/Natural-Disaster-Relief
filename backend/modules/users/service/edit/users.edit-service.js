import bcrypt from 'bcryptjs';

import IUserEditService from './users.interface-edit.js';

class UserEditService extends IUserEditService {
  constructor({ userRepository }) {
    super();
    this.userRepository = userRepository;
  }

  async editUser(data) {
    try {
      data.password = await bcrypt.hash(data.password, 10);
      const user = await this.userRepository.updateUser(data, transaction);
      return user;
    }
    catch (err) {
      throw err;
    }
  }
}

export default UserEditService;