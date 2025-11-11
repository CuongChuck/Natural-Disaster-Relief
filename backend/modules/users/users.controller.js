class UserController {
  constructor({ userFacade }) {
    this.userFacade = userFacade;
  }

  register = async (req, res, next) => {
    try {
      const result = await this.userFacade.registerUser(req.body);
      res.status(201).json({
        message: 'User registered and signed in successfully',
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
        message: 'User signed in successfully',
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
        message: 'User profile edited successfully',
        user: result.user
      });
    }
    catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
}

module.exports = UserController;