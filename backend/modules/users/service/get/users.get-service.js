import IUserGetService from './users.interface-get.js';

class UserGetService extends IUserGetService {
  constructor({ userRepository, db }) {
    super();
    this.userRepository = userRepository;
    this.db = db;
  }

  async getUser(data) {
    const transaction = await this.db.sequelize.transaction();
    try {
      const user = await this.userRepository.getUser(data, transaction);
      await transaction.commit();
      return user;
    }
    catch (err) {
      await transaction.rollback();
      throw err;
    }
  }
}

export default UserGetService;