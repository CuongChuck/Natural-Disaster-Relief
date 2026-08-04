class AuthHandler {
  constructor({ jwtService }) {
    this.jwtService = jwtService;
  }

  verifyToken = async (req, res, next) => {
    try {
      const decodedPayload = await this.jwtService.verifyToken(req.headers.authorization);
      req.userId = decodedPayload.id;
      req.userRole = decodedPayload.role;
      next();
    }
    catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
}

export default AuthHandler;