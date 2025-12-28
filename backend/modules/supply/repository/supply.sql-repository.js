import ISupplyRepository from './supply.interface-repository.js';

class SupplySqlRepository extends ISupplyRepository {
  constructor({ Supply, Event, Category, Unit, User }) {
    super();
    this.Supply = Supply;
    this.Event = Event;
    this.Category = Category;
    this.Unit = Unit;
    this.User = User;
  }

  async findAll() {
    try {
      return await this.Supply.findAll({ attributes: { exclude: [
        'CategoryId', 'UnitId', 'UserId'
      ] }, include: [
        { model: this.Category, attributes: ['name'] },
        { model: this.Unit, attributes: ['name'] },
        { model: this.User, attributes: ['username'] }
      ], raw: true });
    }
    catch (err) {
      throw new Error("Supplies retrieval failed: " + err.message);
    }
  }

  async findByDonor(data, transaction) {
    try {
      return await this.Supply.findOne({ where: { id: data.id, UserId: data.user }, transaction });
    } catch (err) {
      throw new Error("Supply retrieval failed: " + err.message);
    }
  }

  async create(data, transaction) {
    try {
      const supply = await this.Supply.create({
        CategoryId: data.category,
        UnitId: data.unit,
        UserId: data.user,
        name: data.name,
        count: data.count,
        quantity: data.quantity,
        expected_ward: data.ward,
        expected_district: data.district,
        expected_city_province: data.city_province
      }, { transaction });
      return await this.Supply.findByPk(supply.id, {
        attributes: { exclude: [ 'CategoryId', 'UnitId', 'UserId' ] },
        include: [
          { model: this.Category, attributes: ['name'] },
          { model: this.Unit, attributes: ['name'] },
          { model: this.User, attributes: ['username'] }
        ], transaction, raw: true
      });
    } catch (err) {
      throw new Error("Supply creation failed: " + err.message);
    }
  }

  async edit(data, transaction) {
    try {
      await this.Supply.update({
        CategoryId: data.category,
        UnitId: data.unit,
        UserId: data.user,
        name: data.name,
        count: data.count, 
        expected_ward: data.ward,
        expected_district: data.district,
        expected_city_province: data.city_province
      }, { where: { id: data.id } , transaction });
      return await this.Supply.findByPk(data.id, {
        attributes: { exclude: [ 'CategoryId', 'UnitId', 'UserId' ] },
        include: [
          { model: this.Category, attributes: ['name'] },
          { model: this.Unit, attributes: ['name'] },
          { model: this.User, attributes: ['username'] }
        ], transaction, raw: true
      });
    } catch (err) {
      throw new Error("Supply edit failed: " + err.message);
    }
  }

  async delete(data, transaction) {
    try {
      await this.Supply.destroy({ where: { id: data.id }, transaction });
    } catch (err) {
      throw new Error("Supply deletion failed: " + err.message);
    }
  }
}

export default SupplySqlRepository;