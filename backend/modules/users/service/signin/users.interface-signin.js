class IUserSignInService {
  constructor() {
    if (new.target === IUserSignInService) {
      throw new Error('Cannot instantiate interface.');
    }
  }

  async signInUser() {
    throw new Error('Method not implemented.');
  }
}

module.exports = IUserSignInService;