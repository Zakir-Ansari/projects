const AppResponse = require('../models/AppResponse');
const Product = require('../models/Product');
const Category = require('../models/Category');
const AppError = require('../models/AppError');

// Controller to create a category
exports.createCategory = async (req, res, next) => {
  try {
    const { name, description } = req.body;
    const category = await Category.create({ name, description });
    res.status(201).json(new AppResponse(category));
  } catch (error) {
    next(error);
  }
};

exports.createProduct = async (req, res, next) => {
  try {
    const { name, description, price, stock, category: categoryName } = req.body;
    // Find the category by name
    const category = await Category.findOne({ name: categoryName });
    if (!category) {
      throw new AppError(`Invalid Category: ${categoryName}`, 404);
    }
    res.status(201).json(
      new AppResponse(
        await Product.create({
          name,
          description,
          price,
          stock,
          category: category._id,
          createdBy: req.user.id,
        })
      )
    );
  } catch (error) {
    next(error);
  }
};

exports.getProducts = async (req, res, next) => {
  try {
    res.status(200).json(
      new AppResponse(
        await Product.find()
          .populate('category', 'name description') // Fetch category details
          .populate('createdBy', 'username')
      )
    );
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
