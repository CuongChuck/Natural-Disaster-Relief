import bcrypt from 'bcryptjs';

import IUserSignInService from './users.interface-signin.js';

class UserSignInJwtService extends IUserSignInService {
  constructor({ userRepository, jwtService }) {
    super();
    this.userRepository = userRepository;
    this.jwtService = jwtService;
  }

  async signInUser(data) {
    try {
      const user = await this.userRepository.findByUsername(data, transaction);
      if (!user) {
        throw new Error("Username is incorrect.");
      }
      const isMatch = await bcrypt.compare(data.password, user.password);
      if (!isMatch) {
        throw new Error("Password is incorrect.");
      }
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

export default UserSignInJwtService;