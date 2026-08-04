export default class ControllerHelper {
  invoke = (method, controllerName) => (req, res, next) => {
    const container = req.app.get('container');
    const scope = req.scope || container.createScope();
    const controller = scope.resolve(controllerName);
    return controller[method](req, res, next);
  };
};