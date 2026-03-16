import bcrypt from 'bcryptjs';

import IUserEditService from './users.interface-edit.js';

class UserEditService extends IUserEditService {
  constructor({ userRepository, db }) {
    super();
    this.userRepository = userRepository;
    this.db = db;
  }

  async editUser(data) {
    const transaction = await this.db.sequelize.transaction();
    try {
      data.password = await bcrypt.hash(data.password, 10);
      const user = await this.userRepository.updateUser(data, transaction);
      await transaction.commit();
      return user;
    }
    catch (err) {
      await transaction.rollback();
      throw err;
    }
  }
}

export default UserEditService;