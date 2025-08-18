import React, { useState, useEffect } from 'react';
import { Product, Category, ProductVariant } from '../types/product';
import './ProductForm.css';

interface ProductFormProps {
  product?: Product | null;
  categories: Category[];
  onSubmit: ((productData: Omit<Product, '_id' | 'created_at' | 'updated_at'>) => void) | ((id: string, productData: Partial<Product>) => void);
  onCancel: () => void;
}

const ProductForm: React.FC<ProductFormProps> = ({ product, categories, onSubmit, onCancel }) => {
  console.log('ProductForm rendered with categories:', categories);
  console.log('ProductForm categories length:', categories?.length);
  console.log('ProductForm categories type:', typeof categories);
  console.log('ProductForm categories is array:', Array.isArray(categories));
  
  const [formData, setFormData] = useState({
    id: '',
    sku: '',
    title: '',
    description: '',
    short_description: '',
    price: 0,
    currency: 'INR',
    categories: [] as string[],
    images: [] as string[],
    variants: [] as ProductVariant[],
    ratings: {
      average: 0,
      count: 0
    },
    tags: [] as string[],
    is_active: true
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [newImage, setNewImage] = useState('');
  const [newTag, setNewTag] = useState('');
  const [newVariant, setNewVariant] = useState({
    variant_id: '',
    color: '',
    size: '',
    stock: 0
  });

  const [categorySearch, setCategorySearch] = useState('');

  useEffect(() => {
    if (product) {
      setFormData({
        id: product.id,
        sku: product.sku,
        title: product.title,
        description: product.description,
        short_description: product.short_description,
        price: product.price,
        currency: product.currency,
        categories: product.categories,
        images: product.images,
        variants: product.variants,
        ratings: product.ratings,
        tags: product.tags,
        is_active: product.is_active
      });
    }
  }, [product]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.id.trim()) {
      newErrors.id = 'Product ID is required';
    }

    if (!formData.sku.trim()) {
      newErrors.sku = 'SKU is required';
    }

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }

    if (!formData.short_description.trim()) {
      newErrors.short_description = 'Short description is required';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Full description is required';
    } else if (formData.description.length < 50) {
      newErrors.description = 'Full description should be at least 50 characters';
    }

    if (formData.price <= 0) {
      newErrors.price = 'Price must be greater than 0';
    }

    if (formData.categories.length === 0) {
      newErrors.categories = 'At least one category is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }

    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else if (type === 'number') {
      // Handle number inputs properly, allowing empty values
      const numValue = value === '' ? 0 : parseFloat(value) || 0;
      setFormData(prev => ({ ...prev, [name]: numValue }));
    } else {
      // Handle text inputs properly, allowing empty strings
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleCategoryToggle = (categoryName: string) => {
    setFormData(prev => {
      const currentCategories = prev.categories;
      const isSelected = currentCategories.includes(categoryName);
      
      if (isSelected) {
        return { ...prev, categories: currentCategories.filter(cat => cat !== categoryName) };
      } else {
        return { ...prev, categories: [...currentCategories, categoryName] };
      }
    });
    
    // Clear error when user selects categories
    if (errors.categories) {
      setErrors(prev => ({ ...prev, categories: '' }));
    }
  };

  // Filter categories based on search
  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(categorySearch.toLowerCase())
  );

  console.log('Filtered categories:', filteredCategories);
  console.log('Category search term:', categorySearch);

  const addImage = () => {
    if (newImage.trim()) {
      // Basic URL validation
      try {
        new URL(newImage.trim());
        setFormData(prev => ({ ...prev, images: [...prev.images, newImage.trim()] }));
        setNewImage('');
      } catch {
        alert('Please enter a valid URL');
      }
    }
  };

  const removeImage = (index: number) => {
    setFormData(prev => ({ ...prev, images: prev.images.filter((_, i) => i !== index) }));
  };

  const addTag = () => {
    if (newTag.trim()) {
      if (formData.tags.includes(newTag.trim())) {
        alert('Tag already exists');
        return;
      }
      setFormData(prev => ({ ...prev, tags: [...prev.tags, newTag.trim()] }));
      setNewTag('');
    }
  };

  const removeTag = (index: number) => {
    setFormData(prev => ({ ...prev, tags: prev.tags.filter((_, i) => i !== index) }));
  };

  const addVariant = () => {
    if (newVariant.variant_id && newVariant.color && newVariant.size) {
      // Check for duplicate variant_id
      if (formData.variants.some(v => v.variant_id === newVariant.variant_id)) {
        alert('Variant ID already exists');
        return;
      }
      setFormData(prev => ({ ...prev, variants: [...prev.variants, { ...newVariant }] }));
      setNewVariant({ variant_id: '', color: '', size: '', stock: 0 });
    } else {
      alert('Please fill all variant fields');
    }
  };

  const removeVariant = (index: number) => {
    setFormData(prev => ({ ...prev, variants: prev.variants.filter((_, i) => i !== index) }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    if (product) {
      // For update, we need to pass both id and productData
      const updateFn = onSubmit as (id: string, productData: Partial<Product>) => void;
      updateFn(product.id, formData);
    } else {
      // For create, we only pass productData
      const createFn = onSubmit as (productData: Omit<Product, '_id' | 'created_at' | 'updated_at'>) => void;
      createFn(formData);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h2>{product ? 'Edit Product' : 'Add New Product'}</h2>
          <button className="close-btn" onClick={onCancel}>×</button>
        </div>
        
        <form onSubmit={handleSubmit} className="product-form">
          <div className="form-row">
            <div className="form-group">
              <label>Product ID *</label>
              <input
                type="text"
                name="id"
                value={formData.id}
                onChange={handleInputChange}
                required
                disabled={!!product}
                className={errors.id ? 'error' : ''}
              />
              {errors.id && <span className="error-message">{errors.id}</span>}
            </div>
            <div className="form-group">
              <label>SKU *</label>
              <input
                type="text"
                name="sku"
                value={formData.sku}
                onChange={handleInputChange}
                required
                disabled={!!product}
                className={errors.sku ? 'error' : ''}
              />
              {errors.sku && <span className="error-message">{errors.sku}</span>}
            </div>
          </div>

          <div className="form-group">
            <label>Title *</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
              className={errors.title ? 'error' : ''}
            />
            {errors.title && <span className="error-message">{errors.title}</span>}
          </div>

          <div className="form-group">
            <label>Short Description *</label>
            <input
              type="text"
              name="short_description"
              value={formData.short_description}
              onChange={handleInputChange}
              required
              maxLength={200}
              className={errors.short_description ? 'error' : ''}
            />
            <div className="char-counter">
              {formData.short_description.length}/200 characters
            </div>
            {errors.short_description && <span className="error-message">{errors.short_description}</span>}
          </div>

          <div className="form-group">
            <label>Full Description *</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              required
              rows={6}
              placeholder="Enter detailed product description (minimum 50 characters)..."
              className={errors.description ? 'error' : ''}
            />
            <div className="char-counter">
              {formData.description.length} characters (minimum 50)
            </div>
            {errors.description && <span className="error-message">{errors.description}</span>}
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Price *</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                required
                min="0"
                step="0.01"
                className={errors.price ? 'error' : ''}
              />
              {errors.price && <span className="error-message">{errors.price}</span>}
            </div>
            <div className="form-group">
              <label>Currency</label>
              <select name="currency" value={formData.currency} onChange={handleInputChange}>
                <option value="INR">INR</option>
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="GBP">GBP</option>
                <option value="CAD">CAD</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>Categories *</label>
            {categories && categories.length > 0 ? (
              <div className="category-checkbox-group">
                <input
                  type="text"
                  placeholder="Search categories..."
                  value={categorySearch}
                  onChange={(e) => setCategorySearch(e.target.value)}
                  className="search-input"
                />
                {filteredCategories.length > 0 ? (
                  filteredCategories.map((category) => (
                    <label key={category._id} className="checkbox-label">
                      <input
                        type="checkbox"
                        name="categories"
                        checked={formData.categories.includes(category.name)}
                        onChange={() => handleCategoryToggle(category.name)}
                      />
                      <span className="checkmark"></span>
                      {category.name}
                    </label>
                  ))
                ) : (
                  <div className="no-categories-message">
                    <p>No categories found for "{categorySearch}". Try a different search term.</p>
                  </div>
                )}
              </div>
            ) : (
              <div className="no-categories-message">
                <p>No categories available. Please add categories first.</p>
                <button type="button" className="btn btn-small btn-secondary" onClick={() => window.location.reload()}>
                  Refresh Page
                </button>
              </div>
            )}
            <div className="help-text">
              {categories && categories.length > 0 
                ? `Search and select categories by clicking on them (${categories.length} categories available)` 
                : "Categories are loading or not available"
              }
            </div>
            {errors.categories && <span className="error-message">{errors.categories}</span>}
          </div>

          <div className="form-group">
            <label>Images</label>
            <div className="image-input">
              <input
                type="url"
                placeholder="Image URL (e.g., https://example.com/image.jpg)"
                value={newImage}
                onChange={(e) => setNewImage(e.target.value)}
              />
              <button type="button" onClick={addImage} className="btn btn-small btn-secondary">
                Add
              </button>
            </div>
            <div className="image-list">
              {formData.images.map((image, index) => (
                <div key={index} className="image-item">
                  <img src={image} alt={`Product ${index + 1}`} onError={(e) => {
                    e.currentTarget.src = 'https://via.placeholder.com/80x80?text=Image+Error';
                  }} />
                  <button type="button" onClick={() => removeImage(index)} className="remove-btn">
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label>Tags</label>
            <div className="tag-input">
              <input
                type="text"
                placeholder="Enter tag and press Add"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
              />
              <button type="button" onClick={addTag} className="btn btn-small btn-secondary">
                Add
              </button>
            </div>
            <div className="tag-list">
              {formData.tags.map((tag, index) => (
                <span key={index} className="tag">
                  {tag}
                  <button type="button" onClick={() => removeTag(index)} className="remove-tag">
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label>Variants</label>
            <div className="variant-input">
              <input
                type="text"
                placeholder="Variant ID"
                value={newVariant.variant_id}
                onChange={(e) => setNewVariant(prev => ({ ...prev, variant_id: e.target.value }))}
              />
              <input
                type="text"
                placeholder="Color"
                value={newVariant.color}
                onChange={(e) => setNewVariant(prev => ({ ...prev, color: e.target.value }))}
              />
              <input
                type="text"
                placeholder="Size"
                value={newVariant.size}
                onChange={(e) => setNewVariant(prev => ({ ...prev, size: e.target.value }))}
              />
              <input
                type="number"
                placeholder="Stock"
                value={newVariant.stock}
                onChange={(e) => setNewVariant(prev => ({ 
                  ...prev, 
                  stock: e.target.value === '' ? 0 : parseInt(e.target.value) || 0 
                }))}
                min="0"
              />
              <button type="button" onClick={addVariant} className="btn btn-small btn-secondary">
                Add
              </button>
            </div>
            <div className="variant-list">
              {formData.variants.map((variant, index) => (
                <div key={index} className="variant-item">
                  <span>ID: {variant.variant_id}</span>
                  <span>Color: {variant.color}</span>
                  <span>Size: {variant.size}</span>
                  <span>Stock: {variant.stock}</span>
                  <button type="button" onClick={() => removeVariant(index)} className="remove-btn">
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Rating Average</label>
              <input
                type="number"
                value={formData.ratings.average}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  ratings: { 
                    ...prev.ratings, 
                    average: e.target.value === '' ? 0 : parseFloat(e.target.value) || 0 
                  }
                }))}
                min="0"
                max="5"
                step="0.1"
              />
            </div>
            <div className="form-group">
              <label>Rating Count</label>
              <input
                type="number"
                value={formData.ratings.count}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  ratings: { 
                    ...prev.ratings, 
                    count: e.target.value === '' ? 0 : parseInt(e.target.value) || 0 
                  }
                }))}
                min="0"
              />
            </div>
          </div>

          <div className="form-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="is_active"
                checked={formData.is_active}
                onChange={handleInputChange}
              />
              <span className="checkmark"></span>
              Active
            </label>
          </div>

          <div className="form-actions">
            <button type="button" onClick={onCancel} className="btn btn-secondary">
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              {product ? 'Update Product' : 'Create Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;
