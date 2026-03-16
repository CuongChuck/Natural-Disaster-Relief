import IUserDeleteService from './users.interface-delete.js';

class UserDeleteService extends IUserDeleteService {
  constructor({ userRepository, db }) {
    super();
    this.userRepository = userRepository;
    this.db = db;
  }

  async deleteUser(data) {
    const transaction = await this.db.sequelize.transaction();
    try {
      await this.userRepository.deleteUser(data, transaction);
      await transaction.commit();
    }
    catch (err) {
      await transaction.rollback();
      throw err;
    }
  }
}

export default UserDeleteService;