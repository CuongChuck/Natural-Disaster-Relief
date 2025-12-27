import fs from 'fs';
import jwt from 'jsonwebtoken';

import IUserEditService from './users.interface-edit.js';
import db from '../../../../core/models/index.js';

class UserEditService extends IUserEditService {
  constructor({ userRepository }) {
    super();
    this.userRepository = userRepository;
  }

  async editUser(data) {
    const transaction = await db.sequelize.transaction();
    try {
      const publicKey = fs.readFileSync('../../../../public.pem');
      const decodedPayload = jwt.verify(token, publicKey, { algorithms: ['RS256'] });
      data.id = decodedPayload.id;
      const user = await this.userRepository.updateUser(data, { transaction });
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