import { asClass } from "awilix";

import SupplyRedisRepository from "../../modules/supply/repository/supply.redis-repository.js";

export default class ContainerHandler {
  useRedis = (req, res, next) => {
    try {
      const container = req.app.get('container');
      const scope = req.scope || container.createScope();
      scope.register({
        supplyRepository: asClass(SupplyRedisRepository).scoped()
      });
      req.scope = scope;
      next();
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
};