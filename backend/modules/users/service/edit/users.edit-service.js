import fs from 'fs';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import path from 'path';
import { fileURLToPath } from 'url';

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
      const __filename = fileURLToPath(import.meta.url);
      const __dirname = path.dirname(__filename);
      const publicKey = fs.readFileSync(path.resolve(__dirname, '../../../../public_key.pem'), 'utf-8');
      const decodedPayload = jwt.verify(data.token, publicKey, { algorithms: ['RS256'] });
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