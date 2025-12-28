import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

import IUserRegisterService from './users.interface-register.js';
import db from '../../../../core/models/index.js';

class UserRegisterJwtService extends IUserRegisterService {
  constructor({ userRepository }) {
    super();
    this.userRepository = userRepository;
  }

  async registerUser(data) {
    const transaction = await db.sequelize.transaction();
    try {
      const __filename = fileURLToPath(import.meta.url);
      const __dirname = path.dirname(__filename);
      const privateKey = fs.readFileSync(path.resolve(__dirname, '../../../../private_key.pem'), 'utf-8');
      data.password = await bcrypt.hash(data.password, 10);
      const user = await this.userRepository.createUser(data, transaction);
      await transaction.commit();
      return { user, token: jwt.sign(
        { id: user.id, role: user.role },
        privateKey,
        { expiresIn: '2h', algorithm: 'RS256' }
      ) };
    }
    catch (err) {
      await transaction.rollback();
      throw err;
    }
  }
}

export default UserRegisterJwtService;