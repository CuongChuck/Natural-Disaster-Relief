import { asClass } from "awilix";

import SupplyAcceptService from "../../modules/supply/service/edit/supply.accept-service.js";
import RequestAcceptService from "../../modules/request/service/edit/request.accept-service.js";
import EventGetAllBySupplyService from "../../modules/event/service/get-all/event.get-all-by-supply.js";
import EventCreateJourney from "../../modules/event/service/create/event.create-journey.js";
import EventCompleteJourney from "../../modules/event/service/edit/event.complete-journey.js";
import SupplyUpdateStatus from "../../modules/supply/service/edit/supply.update-status.js";

export default class ContainerHandler {
  accept = (req, res, next) => {
    try {
      const container = req.app.get('container');
      const scope = req.scope || container.createScope();
      scope.register({
        requestEditService: asClass(RequestAcceptService).scoped(),
        supplyEditService: asClass(SupplyAcceptService).scoped()
      });
      req.scope = scope;
      next();
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  getSupplyByEvent = (req, res, next) => {
    try {
      const container = req.app.get('container');
      const scope = req.scope || container.createScope();
      scope.register({
        eventGetAllService: asClass(EventGetAllBySupplyService).scoped()
      });
      req.scope = scope;
      next();
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  journey = (req, res, next) => {
    try {
      const container = req.app.get('container');
      const scope = req.scope || container.createScope();
      scope.register({
        eventCreateService: asClass(EventCreateJourney).scoped(),
      });
      req.scope = scope;
      next();
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  completeJourney = (req, res, next) => {
    try {
      const container = req.app.get('container');
      const scope = req.scope || container.createScope();
      scope.register({
        eventEditService: asClass(EventCompleteJourney).scoped(),
        supplyEditService: asClass(SupplyUpdateStatus).scoped()
      });
      req.scope = scope;
      next();
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
};