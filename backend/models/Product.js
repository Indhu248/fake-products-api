const mongoose = require('mongoose');

const variantSchema = new mongoose.Schema({
  variant_id: {
    type: String,
    required: true
  },
  color: {
    type: String,
    required: true
  },
  size: {
    type: String,
    required: true
  },
  stock: {
    type: Number,
    required: true,
    min: 0
  }
});

const ratingsSchema = new mongoose.Schema({
  average: {
    type: Number,
    required: true,
    min: 0,
    max: 5
  },
  count: {
    type: Number,
    required: true,
    min: 0
  }
});

const productSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  sku: {
    type: String,
    required: true,
    unique: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  short_description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  currency: {
    type: String,
    required: true,
    default: 'INR'
  },
  categories: [{
    type: String,
    required: true
  }],
  images: [{
    type: String,
    required: true
  }],
  variants: [variantSchema],
  ratings: ratingsSchema,
  tags: [{
    type: String
  }],
  is_active: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

// Indexes for better query performance
productSchema.index({ title: 'text', description: 'text', tags: 'text' });
productSchema.index({ categories: 1 });
productSchema.index({ price: 1 });
productSchema.index({ is_active: 1 });

// Virtual for formatted price
productSchema.virtual('formatted_price').get(function() {
  return `${this.currency} ${this.price}`;
});

// Ensure virtual fields are serialized
productSchema.set('toJSON', { virtuals: true });
productSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('Product', productSchema);
