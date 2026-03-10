import fs from 'fs';
import jwt from 'jsonwebtoken';

import IUserDeleteService from './users.interface-delete.js';

class UserDeleteService extends IUserDeleteService {
  constructor({ userRepository, jwtService, db }) {
    super();
    this.userRepository = userRepository;
    this.jwtService = jwtService;
    this.db = db;
  }

  async deleteUser({ token }) {
    const transaction = this.db.sequelize.transaction();
    try {
      const decodedPayload = this.jwtService.verifyToken(token);
      await this.userRepository.deleteUser({ id: decodedPayload.id }, transaction);
      await transaction.commit();
    }
    catch (err) {
      await transaction.rollback();
      throw err;
    }
  }
}

export default UserDeleteService;