import { asClass } from "awilix";

import SupplyRedisRepository from "../../modules/supply/repository/supply.redis-repository.js";
import SupplyGetAllUnverified from "../../modules/supply/service/get-all/supply.get-all-unverified.js";
import SupplyGetOneUnverified from "../../modules/supply/service/get-one/supply.get-one-unverified.js";
import SupplyGetMineUnverified from "../../modules/supply/service/get-mine/supply.get-mine-unverified.js";
import SupplyCreateService from "../../modules/supply/service/create/supply.create-service.js";

export default class ContainerHandler {
  useRedis = (req, res, next) => {
    try {
      const container = req.app.get('container');
      const scope = req.scope || container.createScope();
      scope.register({
        supplyRepository: asClass(SupplyRedisRepository).scoped(),
        supplyGetAllService: asClass(SupplyGetAllUnverified).scoped(),
        supplyGetOneService: asClass(SupplyGetOneUnverified).scoped(),
        supplyGetMineService: asClass(SupplyGetMineUnverified).scoped(),
        supplyCreateService: asClass(SupplyCreateService).scoped()
      });
      req.scope = scope;
      next();
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
};