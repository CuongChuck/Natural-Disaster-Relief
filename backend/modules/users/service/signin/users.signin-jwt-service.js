import jwt from 'jsonwebtoken';
import fs from 'fs';
import bcrypt from 'bcryptjs';
import { fileURLToPath } from 'url';
import path from 'path';

import IUserSignInService from './users.interface-signin.js';
import db from '../../../../core/models/index.js';

class UserSignInJwtService extends IUserSignInService {
  constructor({ userRepository }) {
    super();
    this.userRepository = userRepository;
  }

  async signInUser(data) {
    const transaction = await db.sequelize.transaction();
    try {
      const __filename = fileURLToPath(import.meta.url);
      const __dirname = path.dirname(__filename);
      const privateKey = fs.readFileSync(path.resolve(__dirname, '../../../../private.key'), 'utf-8');
      const user = await this.userRepository.findByUsername(data, transaction);
      if (!user) {
        throw new Error("Username or password is incorrect.");
      }
      const isMatch = await bcrypt.compare(data.password, user.password);
      if (!isMatch) {
        throw new Error("Username or password is incorrect.");
      }
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

export default UserSignInJwtService;