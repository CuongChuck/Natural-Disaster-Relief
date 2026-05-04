export default class Injection {
  getAllUnverified = (req, res, next) => {
    try {
      req.status = [1,2];
      req.order = 'ASC';
      next();
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  getMineUnverified = (req, res, next) => {
    try {
      req.status = [1,2];
      req.order = 'DESC';
      next();
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  getVerified = (req, res, next) => {
    try {
      req.status = [3];
      next();
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
}