class UserController {
  constructor({ userFacade }) {
    this.userFacade = userFacade;
  }

  get = async (req, res, next) => {
    try {
      const data = req.body;
      data.userId = req.userId;
      const result = await this.userFacade.getUser(data);
      res.status(201).json({
        message: result.message,
        user: result.user
      });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

  register = async (req, res, next) => {
    try {
      const result = await this.userFacade.registerUser(req.body);
      res.status(201).json({
        message: result.message,
        user: result.user,
        token: result.token
      });
    }
    catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

  signIn = async (req, res, next) => {
    try {
      const result = await this.userFacade.signInUser(req.body);
      res.status(201).json({
        message: result.message,
        user: result.user,
        token: result.token
      });
    }
    catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

  edit = async (req, res, next) => {
    try {;
      const data = req.body;
      data.userId = req.userId;
      data.userRole = req.userRole;
      const result = await this.userFacade.editUser(data);
      res.status(200).json({
        message: result.message,
        user: result.user
      });
    }
    catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

  delete = async (req, res, next) => {
    try {
      const data = req.body;
      data.userId = req.userId;
      const result = await this.userFacade.deleteUser(data);
      res.status(200).json({ message: result.message });
    }
    catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
}

export default UserController;