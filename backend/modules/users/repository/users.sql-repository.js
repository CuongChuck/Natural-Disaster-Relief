import IUserRepository from './users.interface-repository.js';

class UserSqlRepository extends IUserRepository {
  constructor({ User }) {
    super();
    this.User = User;
  }

  async getUser(data, transaction) {
    try {
      const user = await this.User.findByPk(data.userId, { attributes: [
        'email',
        'name',
        'username',
        'phone',
        'ward',
        'district',
        'city_province'
      ], transaction });
      if (!user) throw new Error('There is no such user');
      return user.toJSON();
    } catch (err) {
      throw new Error("User retrieval failed: " + err.message);
    }
  }

  async createUser(data, transaction) {
    try {
      const user = await this.User.create({
        name: data.name,
        username: data.username,
        email: data.email,
        password: data.password,
        phone: data.phone,
        ward: data.ward,
        district: data.district,
        city_province: data.city_province,
        role: data.role
      }, { transaction });
      if (!user) throw new Error('Cannot create user');
      return user.toJSON();
    }
    catch (err) {
      throw new Error("User creation failed: " + err.message);
    }
  }

  async findByUsername(data, transaction) {
    try {
      const user = await this.User.findOne({ where: { username: data.username }, transaction });
      if (!user) throw new Error('There is no user with username: ' + data.username);
      return user.toJSON();
    }
    catch (err) {
      throw new Error("User retrieval failed: " + err.message);
    }
  }

  async updateUser(data, transaction) {
    try {
      const user = await this.User.findByPk(data.userId);
      if (!user) throw new Error('There is no such user');
      await this.User.update({
        name: data.name,
        username: data.username,
        email: data.email,
        password: data.password,
        phone: data.phone,
        ward: data.ward,
        district: data.district,
        city_province: data.city_province
      }, { where: { id: data.userId }, transaction });
      return await this.User.findByPk(data.userId, { attributes: [
        'email',
        'name',
        'username',
        'phone',
        'ward',
        'district',
        'city_province'
      ], transaction });
    }
    catch (err) {
      throw new Error("User profile update failed: " + err.message);
    }
  }

  async deleteUser(data, transaction) {
    try {
      const user = await this.User.findByPk(data.userId);
      if (!user) throw new Error('There is no such user');
      await this.User.destroy({ where: { id: data.userId }, force: true, transaction: transaction });
    }
    catch (err) {
      throw new Error("User deletion failed: " + err.message);
    }
  }
}

export default UserSqlRepository;