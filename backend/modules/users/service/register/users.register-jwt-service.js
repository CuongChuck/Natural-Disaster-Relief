import bcrypt from 'bcryptjs';

import IUserRegisterService from './users.interface-register.js';

class UserRegisterJwtService extends IUserRegisterService {
  constructor({ userRepository, jwtService }) {
    super();
    this.userRepository = userRepository;
    this.jwtService = jwtService;
  }

  async registerUser(data) {
    try {
      data.password = await bcrypt.hash(data.password, 10);
      const user = await this.userRepository.createUser(data);
      return {
        token: this.jwtService.generateToken({ id: user.id, role: user.role }),
        role: user.role,
        name: user.name
      };
    }
    catch (err) {
      throw err;
    }
  }
}

export default UserRegisterJwtService;