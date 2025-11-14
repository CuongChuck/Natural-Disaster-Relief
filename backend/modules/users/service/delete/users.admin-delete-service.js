const IUserDeleteService = require('./users.interface-delete');
const { db } = require('../../../../core/models');

class UserAdminDeleteService extends IUserDeleteService {
  constructor({ userRepository }) {
    super();
    this.userRepository = userRepository;
  }

  async deleteUser({ id }) {
    const transaction = db.sequelize.transaction();
    try {
      await this.userRepository.deleteUser({ id }, transaction);
      await transaction.commit();
    }
    catch (err) {
      await transaction.rollback();
      throw err;
    }
  }
}

module.exports = UserAdminDeleteService;