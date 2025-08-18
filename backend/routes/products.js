const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// GET all products with pagination and filtering
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Build filter object
    const filter = {};
    
    if (req.query.category) {
      filter.categories = req.query.category;
    }
    
    if (req.query.search) {
      filter.$text = { $search: req.query.search };
    }
    
    if (req.query.min_price || req.query.max_price) {
      filter.price = {};
      if (req.query.min_price) filter.price.$gte = parseFloat(req.query.min_price);
      if (req.query.max_price) filter.price.$lte = parseFloat(req.query.max_price);
    }
    
    if (req.query.is_active !== undefined) {
      filter.is_active = req.query.is_active === 'true';
    }

    const products = await Product.find(filter)
      .sort({ created_at: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Product.countDocuments(filter);

    res.json({
      status: 'success',
      data: {
        products,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit)
        }
      }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
});

// GET single product by ID
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findOne({ 
      $or: [
        { id: req.params.id },
        { sku: req.params.id }
      ]
    });

    if (!product) {
      return res.status(404).json({
        status: 'error',
        message: 'Product not found'
      });
    }

    res.json({
      status: 'success',
      data: product
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
});

// POST create new product
router.post('/', async (req, res) => {
  try {
    // Check if product with same ID or SKU already exists
    const existingProduct = await Product.findOne({
      $or: [
        { id: req.body.id },
        { sku: req.body.sku }
      ]
    });

    if (existingProduct) {
      return res.status(400).json({
        status: 'error',
        message: 'Product with this ID or SKU already exists'
      });
    }

    const product = new Product(req.body);
    await product.save();

    res.status(201).json({
      status: 'success',
      data: product
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
});

// PUT update product
router.put('/:id', async (req, res) => {
  try {
    const product = await Product.findOneAndUpdate(
      { id: req.params.id },
      req.body,
      { new: true, runValidators: true }
    );

    if (!product) {
      return res.status(404).json({
        status: 'error',
        message: 'Product not found'
      });
    }

    res.json({
      status: 'success',
      data: product
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
});

// DELETE product
router.delete('/:id', async (req, res) => {
  try {
    const product = await Product.findOneAndDelete({ id: req.params.id });

    if (!product) {
      return res.status(404).json({
        status: 'error',
        message: 'Product not found'
      });
    }

    res.json({
      status: 'success',
      message: 'Product deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
});

// POST bulk create products
router.post('/bulk', async (req, res) => {
  try {
    const { products } = req.body;

    if (!Array.isArray(products)) {
      return res.status(400).json({
        status: 'error',
        message: 'Products must be an array'
      });
    }

    // Check for duplicates
    const ids = products.map(p => p.id);
    const skus = products.map(p => p.sku);
    
    const existingProducts = await Product.find({
      $or: [
        { id: { $in: ids } },
        { sku: { $in: skus } }
      ]
    });

    if (existingProducts.length > 0) {
      return res.status(400).json({
        status: 'error',
        message: 'Some products already exist',
        existing: existingProducts.map(p => ({ id: p.id, sku: p.sku }))
      });
    }

    const createdProducts = await Product.insertMany(products);

    res.status(201).json({
      status: 'success',
      data: {
        count: createdProducts.length,
        products: createdProducts
      }
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
});

module.exports = router;
