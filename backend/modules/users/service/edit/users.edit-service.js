import bcrypt from 'bcryptjs';

import IUserEditService from './users.interface-edit.js';

class UserEditService extends IUserEditService {
  constructor({ userRepository, jwtService, db }) {
    super();
    this.userRepository = userRepository;
    this.jwtService = jwtService;
    this.db = db;
  }

  async editUser(data) {
    const transaction = await this.db.sequelize.transaction();
    try {
      const decodedPayload = this.jwtService.verifyToken(data.token);
      data.id = decodedPayload.id;
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