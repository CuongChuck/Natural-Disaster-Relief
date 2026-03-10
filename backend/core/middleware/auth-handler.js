class AuthHandler {
  constructor({ jwtService }) {
    this.jwtService = jwtService;
  }

  verifyToken = async (req, res, next) => {
    try {
      const result = await this.jwtService.verifyToken(req.body);
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
}

export default AuthHandler;