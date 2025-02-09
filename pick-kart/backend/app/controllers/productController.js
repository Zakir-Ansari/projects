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
    const { name, description, price, stock, images, category: categoryName } = req.body;
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
          images,
          category: category._id,
          createdBy: req.user.id,
        })
      )
    );
  } catch (error) {
    next(error);
  }
};

exports.updateProduct = async (req, res, next) => {
  try {
    const { productId, name, description, price, stock, images, category: categoryName } = req.body;

    if (!productId) {
      throw new AppError('Product ID is required for updating a product.', 400);
    }

    // Find the product by ID
    const product = await Product.findById(productId);
    if (!product) {
      throw new AppError(`Product not found with ID: ${productId}`, 404);
    }

    // Check if the request user is the owner of the product
    if (product.createdBy.toString() !== req.user.id) {
      throw new AppError('You are not authorized to update this product.', 403);
    }
    // Find the category if provided
    let category;
    if (categoryName) {
      category = await Category.findOne({ name: categoryName });
      if (!category) {
        throw new AppError(`Invalid Category: ${categoryName}`, 404);
      }
    }

    // Update product fields
    product.name = name || product.name;
    product.description = description || product.description;
    product.price = price || product.price;
    product.stock = stock || product.stock;
    product.images = images || product.images;
    product.category = category ? category._id : product.category;

    // Save the updated product
    await product.save();

    res.status(200).json(new AppResponse(product, 'Product updated successfully.'));
  } catch (error) {
    next(error);
  }
};

exports.getProducts = async (req, res, next) => {
  try {
    const products = await Product.find().populate('category', 'name description').populate({
      path: 'createdBy',
      select: 'username profile.firstName profile.lastName', // Include firstName & lastName from profile
    });

    // Modify the response to include only the first image
    const modifiedProducts = products.map(product => ({
      ...product._doc,
      images: product.images.length > 0 ? [product.images[0]] : [], // Only first image
    }));

    res.status(200).json(new AppResponse(modifiedProducts));
  } catch (error) {
    next(error);
  }
};

exports.getProduct = async (req, res, next) => {
  try {
    const { productId } = req.params;

    const product = await Product.findById(productId).populate('category', 'name description').populate({
      path: 'createdBy',
      select: 'username profile.firstName profile.lastName', // Include firstName & lastName from profile
    });

    if (!product) {
      throw new AppError('Product not found!', 404);
    }

    res.status(200).json(new AppResponse(product));
  } catch (error) {
    next(error);
  }
};
