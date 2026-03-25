import { asClass } from "awilix";

import SupplyRedisRepository from "../../modules/supply/repository/supply.redis-repository.js";

export default class ContainerHandler {
  registerRedis = (scope) => {
    scope.register({
      supplyRepository: asClass(SupplyRedisRepository).scoped()
    });
  };

  useRedis = (req, res, next) => {
    try {
      const container = req.app.get('container');
      req.scope = container.createScope();
      this.registerRedis(req.scope);
      next();
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
};