import IUserRepository from './users.interface-repository.js';

class UserSqlRepository extends IUserRepository {
  constructor({ User }) {
    super();
    this.User = User;
  }

  getUser = async (data) => {
    try {
      const user = await this.User.findByPk(data.userId, {
        attributes: [
          'email',
          'name',
          'username',
          'phone',
          'address_line',
          'ward',
          'district',
          'city_province',
          'role'
        ]
      });
      if (!user) throw new Error('There is no such user');
      return user.toJSON();
    } catch (err) {
      throw new Error("User retrieval failed: " + err.message);
    }
  }

  getUsers = async (data) => {
    try {
      return await this.User.findAll({ 
        attributes: [ 'id', 'username' ],
        where: {
          id: data
        },
        raw: true
      });
    } catch (err) {
      throw new Error("User retrieval failed: " + err.message);
    }
  }

  createUser = async (data, transaction) => {
    try {
      const user = await this.User.create({
        name: data.name,
        username: data.username,
        email: data.email,
        password: data.password,
        phone: data.phone,
        address_line: data.address_line,
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

  findByUsername = async (data, transaction) => {
    try {
      const user = await this.User.findOne({ where: { username: data.username }, transaction });
      if (!user) throw new Error('There is no user with username: ' + data.username);
      return user.toJSON();
    }
    catch (err) {
      throw new Error("User retrieval failed: " + err.message);
    }
  }

  checkOperator = async (data) => {
    try {
      const user = await this.User.findByPk(data.userId, {
        attributes: [ 'role' ]
      });
      if (!(['ADMIN', 'VOLUNTEER'].includes(user.role)))
        throw new Error('User is not authorized to perform this action');
    } catch (err) {
      throw new Error("Operator check failed: " + err.message);
    }
  }

  updateUser = async (data, transaction) => {
    try {
      const user = await this.User.findByPk(data.userId);
      if (!user) throw new Error('There is no such user');
      await this.User.update({
        name: data.name,
        username: data.username,
        email: data.email,
        password: data.password,
        phone: data.phone,
        address_line: data.address_line,
        ward: data.ward,
        district: data.district,
        city_province: data.city_province
      }, { where: { id: data.userId }, transaction });
      return await this.User.findByPk(data.userId, { attributes: [
        'email',
        'name',
        'username',
        'phone',
        'address_line',
        'ward',
        'district',
        'city_province'
      ], transaction });
    }
    catch (err) {
      throw new Error("User profile update failed: " + err.message);
    }
  }

  deleteUser = async (data, transaction) => {
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