const IUserEditService = require('./users.interface-edit');
const { db } = require('../../../../core/models');

class UserEditService extends IUserEditService {
  constructor({ userRepository }) {
    super();
    this.userRepository = userRepository;
  }

  async editUser({ id, name, username, email, password }) {
    const transaction = db.sequelize.transaction();
    try {
      const user = await this.userRepository.updateUser({ id, name, username, email, password }, { transaction });
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