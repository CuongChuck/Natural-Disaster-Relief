import IUserEditService from './users.interface-edit.js';
import db from '../../../../core/models/index.js';

class UserAdminEditService extends IUserEditService {
  constructor({ userRepository }) {
    super();
    this.userRepository = userRepository;
  }

  async editUser(data) {
    const transaction = await db.sequelize.transaction();
    try {
      const user = await this.userRepository.updateUser(data, transaction);
      await transaction.commit();
      return user;
    }
    catch (err) {
      await transaction.rollback();
      throw err;
    }
  }
}

export default UserAdminEditService;