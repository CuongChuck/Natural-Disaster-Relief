class IUserRepository {
  constructor() {
    if (new.target === IUserRepository) {
      throw new Error('Cannot instantiate interface.');
    }
  }

  getUser = async (data) => {
    throw new Error('Method not implemented.');
  }

  getUsers = async (data) => {
    throw new Error('Method not implemented.');
  }

  createUser = async (data) => {
    throw new Error('Method not implemented.');
  }

  findByUsername = async (data) => {
    throw new Error('Method not implemented.');
  }

  updateUser = async (data) => {
    throw new Error('Method not implemented.');
  }

  deleteUser = async (data) => {
    throw new Error('Method not implemented.');
  }
}

export default IUserRepository;