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
      return await this.userModel.findOne({ where: { username: username } }, { transaction });
    }
    catch (err) {
      throw new Error("User retrieval failed: " + err.message);
    }
  }

  async updateUser({ id, name, username, email, password }, transaction) {
    try {
      await this.userModel.update({
        name: name,
        username: username,
        email: email,
        password: password
      }, { transaction });
      return await this.userModel.findByPk(id, { transaction });
    }
    catch (err) {
      throw new Error("User profile update failed: " + err.message);
    }
  }

  async deleteUser({ id }, transaction) {
    try {
      await this.userModel.delete({ where: { id: id } }, { transaction });
    }
    catch (err) {
      throw new Error("User deletion failed: " + err.message);
    }
  }
}

module.exports = UserSqlRepository;