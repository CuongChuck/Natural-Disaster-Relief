class IUserSignInService {
  constructor() {
    if (new.target === IUserSignInService) {
      throw new Error('Cannot instantiate interface.');
    }
  }

  async signInUser(data) {
    throw new Error('Method not implemented.');
  }
}

export default IUserSignInService;