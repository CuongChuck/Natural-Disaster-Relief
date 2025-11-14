const jwt = require('jsonwebtoken');
const fs = require('fs');

const IUserRegisterService = require('./users.interface-register');
const { db } = require('../../../../core/models');

class UserRegisterJwtService extends IUserRegisterService {
  constructor({ userRepository }) {
    super();
    this.userRepository = userRepository;
  }

  async registerUser({ name, username, email, password, role }) {
    const transaction = await db.sequelize.transaction();
    const privateKey = fs.readFileSync('../../../../private.key');
    try {
      const user = await this.userRepository.createUser({ name, username, email, password, role }, transaction);
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

module.exports = UserRegisterJwtService;