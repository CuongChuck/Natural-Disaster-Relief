import fs from 'fs';
import jwt from 'jsonwebtoken';

import IUserDeleteService from './users.interface-delete.js';
import db from '../../../../core/models/index.js';

class UserDeleteService extends IUserDeleteService {
  constructor({ userRepository }) {
    super();
    this.userRepository = userRepository;
  }

  async deleteUser({ token }) {
    const transaction = db.sequelize.transaction();
    try {
      const publicKey = fs.readFileSync('../../../../public.pem');
      const decodedPayload = jwt.verify(token, publicKey, { algorithms: ['RS256'] });
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