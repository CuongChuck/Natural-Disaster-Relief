const jwt = require('jsonwebtoken');
const fs = require('fs');

const IUserSignInService = require('./users.interface-signin');
const { db } = require('../../../../core/models');

class UserSignInJwtService extends IUserSignInService {
  constructor({ userRepository }) {
    super();
    this.userRepository = userRepository;
  }

  async signInUser({ username, password }) {
    const transaction = db.sequelize.transaction();
    const privateKey = fs.readFileSync('../../../../private.key');
    try {
      const user = await this.userRepository.findByUsername(username, transaction);
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

module.exports = UserSignInJwtService;