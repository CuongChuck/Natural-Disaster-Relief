import IUserDeleteService from './users.interface-delete.js';
import db from '../../../../core/models/index.js';

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

export default UserAdminDeleteService;