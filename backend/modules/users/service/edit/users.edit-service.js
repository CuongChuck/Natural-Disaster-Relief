const fs = require('fs');
const jwt = require('jsonwebtoken');

const IUserEditService = require('./users.interface-edit');
const { db } = require('../../../../core/models');

class UserEditService extends IUserEditService {
  constructor({ userRepository }) {
    super();
    this.userRepository = userRepository;
  }

  async editUser({ token, name, username, email, password }) {
    const transaction = db.sequelize.transaction();
    try {
      const publicKey = fs.readFileSync('../../../../public.pem');
      const decodedPayload = jwt.verify(token, publicKey, { algorithms: ['RS256'] });
      const user = await this.userRepository.updateUser({
        id: decodedPayload.id,
        name: name,
        username: username,
        email: email,
        password: password
      }, { transaction });
      await transaction.commit();
      return user;
    }
    catch (err) {
      await transaction.rollback();
      throw err;
    }
  }
}

module.exports = UserEditService;