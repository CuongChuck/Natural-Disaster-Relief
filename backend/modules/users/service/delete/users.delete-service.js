const fs = require('fs');
const jwt = require('jsonwebtoken');

const IUserDeleteService = require('./users.interface-delete');
const { db } = require('../../../../core/models');

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

module.exports = UserDeleteService;