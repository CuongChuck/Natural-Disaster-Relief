import IUserRepository from './users.interface-repository.js';

class UserSqlRepository extends IUserRepository {
  constructor({ User }) {
    super();
    this.User = User;
  }

  async createUser(data, transaction){
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
      return user.toJSON();
    }
    catch (err) {
      throw new Error("User creation failed: " + err.message);
    }
  }

  async findByUsername(data, transaction) {
    try {
      const user = await this.User.findOne({ where: { username: data.username }, transaction })
      return user.toJSON();
    }
    catch (err) {
      throw new Error("User retrieval failed: " + err.message);
    }
  }

  async updateUser(data, transaction) {
    try {
      await this.User.update({
        name: data.name,
        username: data.username,
        email: data.email,
        password: data.password,
        phone: data.phone,
        ward: data.ward,
        district: data.district,
        city_province: data.city_province,
        role: data.role
      }, { where: { id: data.id }, transaction });
      return await this.User.findByPk(data.id, { attributes: [
        'email',
        'name',
        'username',
        'phone',
        'ward',
        'district',
        'city_province',
        'role'
      ], transaction });
    }
    catch (err) {
      throw new Error("User profile update failed: " + err.message);
    }
  }

  async deleteUser({ id }, transaction) {
    try {
      await this.User.delete({ where: { id: id }, transaction });
    }
    catch (err) {
      throw new Error("User deletion failed: " + err.message);
    }
  }
}

export default UserSqlRepository;