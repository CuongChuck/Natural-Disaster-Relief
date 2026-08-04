class CategoryController {
  constructor({ categoryFacade }) {
    this.categoryFacade = categoryFacade;
  }

  getAll = async (req, res, next) => {
    try {
      const result = await this.categoryFacade.getAll();
      res.status(200).json({
        message: result.message,
        categories: result.categories
      });
    }
    catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
}

export default CategoryController;