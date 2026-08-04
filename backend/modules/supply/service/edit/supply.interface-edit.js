class ISupplyEditService {
  constructor() {
    if (new.target === ISupplyEditService) {
      throw new Error('Cannot instantiate interface.');
    }
  }

  async edit(data) {
    throw new Error('Method not implemented.');
  }
}

export default ISupplyEditService;