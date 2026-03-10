import jwt from 'jsonwebtoken';
import path from 'path';
import fs from 'fs';
import { JWT_PRIVATE_KEY_PATH, JWT_PUBLIC_KEY_PATH } from '../config/env.js';

class JwtService {
  constructor() {
    this.private = fs.readFileSync(path.resolve(JWT_PRIVATE_KEY_PATH));
    this.public = fs.readFileSync(path.resolve(JWT_PUBLIC_KEY_PATH));
  }

  generateToken = (payload) => {
    return jwt.sign(payload, this.private, { algorithm: 'RS256', expiresIn: '5h' });
  }

  verifyToken = (token) => {
    try {
      return jwt.verify(token, this.public, { algorithms: ['RS256'] });
    } catch (err) {
      throw new Error('Invalid token');
    }
  }
}

export default JwtService;