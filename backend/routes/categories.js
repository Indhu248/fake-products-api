const express = require('express');
const router = express.Router();
const Category = require('../models/Category');

// GET all categories
router.get('/', async (req, res) => {
  try {
    const categories = await Category.find({ is_active: true })
      .populate('parent_category', 'name')
      .sort({ name: 1 });

    res.json({
      status: 'success',
      data: categories
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
});

// GET single category by ID or slug
router.get('/:identifier', async (req, res) => {
  try {
    const category = await Category.findOne({
      $or: [
        { _id: req.params.identifier },
        { slug: req.params.identifier }
      ]
    }).populate('parent_category', 'name');

    if (!category) {
      return res.status(404).json({
        status: 'error',
        message: 'Category not found'
      });
    }

    res.json({
      status: 'success',
      data: category
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
});

// POST create new category
router.post('/', async (req, res) => {
  try {
    // Generate slug from name if not provided
    if (!req.body.slug) {
      req.body.slug = req.body.name.toLowerCase().replace(/\s+/g, '-');
    }

    // Check if category with same name or slug already exists
    const existingCategory = await Category.findOne({
      $or: [
        { name: req.body.name },
        { slug: req.body.slug }
      ]
    });

    if (existingCategory) {
      return res.status(400).json({
        status: 'error',
        message: 'Category with this name or slug already exists'
      });
    }

    const category = new Category(req.body);
    await category.save();

    res.status(201).json({
      status: 'success',
      data: category
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
});

// PUT update category
router.put('/:id', async (req, res) => {
  try {
    const category = await Category.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!category) {
      return res.status(404).json({
        status: 'error',
        message: 'Category not found'
      });
    }

    res.json({
      status: 'success',
      data: category
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
});

// DELETE category
router.delete('/:id', async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);

    if (!category) {
      return res.status(404).json({
        status: 'error',
        message: 'Category not found'
      });
    }

    res.json({
      status: 'success',
      message: 'Category deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
});

module.exports = router;
