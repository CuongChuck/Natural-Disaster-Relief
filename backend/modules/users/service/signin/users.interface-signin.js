class IUserSignIn {
  constructor() {
    if (new.target === IUserSignIn) {
      throw new Error('Cannot instantiate interface.');
    }
  }

  async signInUser() {
    throw new Error('Method not implemented.');
  }
}

module.exports = IUserSignIn;