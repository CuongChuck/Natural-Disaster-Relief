const IUserRepository = require('../users.interface-repository');
const bcrypt = require('bcryptjs');

class UserSqlRepository extends IUserRepository {
  constructor({ userModel }) {
    super();
    this.userModel = userModel;
  }

  async createUser({ name, username, email, password, role }, transaction){
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
      return await this.userModel.create({ name: name, username: username, email: email, password: hashedPassword, role: role }, { transaction });
    }
    catch (err) {
      throw new Error("User creation failed: " + err.message);
    }
  }

  async findByUsername(username, transaction) {
    try {
      return await this.userModel.findOne({ where: { username: username } });
    }
    catch (err) {
      throw new Error("User retrieval failed: " + err.message);
    }
  }
}

module.exports = UserSqlRepository;