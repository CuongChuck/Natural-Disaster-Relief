import bcrypt from 'bcryptjs';

import IUserRegisterService from './users.interface-register.js';

class UserRegisterJwtService extends IUserRegisterService {
  constructor({ userRepository, jwtService, db }) {
    super();
    this.userRepository = userRepository;
    this.jwtService = jwtService;
    this.db = db;
  }

  async registerUser(data) {
    const transaction = await this.db.sequelize.transaction();
    try {
      data.password = await bcrypt.hash(data.password, 10);
      const user = await this.userRepository.createUser(data, transaction);
      await transaction.commit();
      return {
        token: this.jwtService.generateToken({ id: user.id, role: user.role }),
        role: user.role,
        name: user.name
      };
    }
    catch (err) {
      await transaction.rollback();
      throw err;
    }
  }
}

export default UserRegisterJwtService;