class UserController {
  constructor({ userFacade }) {
    this.userFacade = userFacade;
  }

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
      res.status(500).json({ error: err.message });
    }
  };

  signIn = async (req, res, next) => {
    try {
      const result = await this.userFacade.signInUser(req.body);
      res.status(200).json({
        message: result.message,
        user: result.user,
        token: result.token
      });
    }
    catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

  edit = async (req, res, next) => {
    try {
      const result = await this.userFacade.editUser(req.body);
      res.status(200).json({
        message: result.message,
        user: result.user
      });
    }
    catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

  delete = async (req, res, next) => {
    try {
      const result = await this.userFacade.deleteUser(req.body);
      res.status(200).json({ message: result.message });
    }
    catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
}

module.exports = UserController;