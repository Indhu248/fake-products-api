import React, { useState, useEffect } from 'react';
import { Product, Category } from '../types/product';
import { productsAPI, categoriesAPI } from '../services/api';
import './DemoShop.css';

const DemoShop: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'price' | 'rating'>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [productsResponse, categoriesResponse] = await Promise.all([
        productsAPI.getAll({ limit: 50 }),
        categoriesAPI.getAll(),
      ]);
      
      setProducts(productsResponse.data.products);
      setCategories(categoriesResponse.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Filter and sort products
  const filteredAndSortedProducts = products
    .filter(product => {
      const matchesCategory = !selectedCategory || product.categories.includes(selectedCategory);
      const matchesSearch = !searchTerm || 
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      let aValue: any, bValue: any;
      
      switch (sortBy) {
        case 'name':
          aValue = a.title.toLowerCase();
          bValue = b.title.toLowerCase();
          break;
        case 'price':
          aValue = a.price;
          bValue = b.price;
          break;
        case 'rating':
          aValue = a.ratings.average;
          bValue = b.ratings.average;
          break;
        default:
          aValue = a.title.toLowerCase();
          bValue = b.title.toLowerCase();
      }

      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

  const formatPrice = (price: number, currency: string) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: currency,
    }).format(price);
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={i} className="star filled">★</span>);
    }
    
    if (hasHalfStar) {
      stars.push(<span key="half" className="star half">★</span>);
    }
    
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<span key={`empty-${i}`} className="star empty">☆</span>);
    }

    return stars;
  };

  if (loading) {
    return (
      <div className="demo-shop">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading amazing products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="demo-shop">
      {/* Header */}
      <header className="shop-header">
        <div className="header-content">
          <h1>🛍️ Demo Shop</h1>
          <p>Discover amazing products from our collection</p>
        </div>
      </header>

      {/* Filters and Search */}
      <div className="filters-section">
        <div className="filters-container">
          {/* Search */}
          <div className="search-box">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            <span className="search-icon">🔍</span>
          </div>

          {/* Category Filter */}
          <div className="category-filter">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="category-select"
            >
              <option value="">All Categories</option>
              {categories.map(category => (
                <option key={category._id} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          {/* Sort Options */}
          <div className="sort-options">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'name' | 'price' | 'rating')}
              className="sort-select"
            >
              <option value="name">Sort by Name</option>
              <option value="price">Sort by Price</option>
              <option value="rating">Sort by Rating</option>
            </select>
            <button
              onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
              className="sort-order-btn"
            >
              {sortOrder === 'asc' ? '↑' : '↓'}
            </button>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="products-section">
        <div className="products-info">
          <h2>Products ({filteredAndSortedProducts.length})</h2>
          {selectedCategory && (
            <span className="category-badge">
              Category: {selectedCategory}
            </span>
          )}
        </div>

        {filteredAndSortedProducts.length === 0 ? (
          <div className="no-products">
            <div className="no-products-icon">😔</div>
            <h3>No products found</h3>
            <p>Try adjusting your search or category filters</p>
          </div>
        ) : (
          <div className="products-grid">
            {filteredAndSortedProducts.map(product => (
              <div key={product._id} className="product-card">
                {/* Product Image */}
                <div className="product-image">
                  {product.images && product.images.length > 0 ? (
                    <img 
                      src={product.images[0]} 
                      alt={product.title}
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = 'https://via.placeholder.com/300x200?text=No+Image';
                      }}
                    />
                  ) : (
                    <div className="no-image">
                      <span>📷</span>
                      <p>No Image</p>
                    </div>
                  )}
                  
                  {/* Product Status */}
                  {!product.is_active && (
                    <div className="product-status inactive">Out of Stock</div>
                  )}
                  
                  {/* Quick Actions */}
                  <div className="product-actions">
                    <button className="action-btn wishlist">❤️</button>
                    <button className="action-btn quick-view">👁️</button>
                  </div>
                </div>

                {/* Product Info */}
                <div className="product-info">
                  {/* Categories */}
                  <div className="product-categories">
                    {product.categories.slice(0, 2).map(category => (
                      <span key={category} className="category-tag">
                        {category}
                      </span>
                    ))}
                    {product.categories.length > 2 && (
                      <span className="category-tag more">+{product.categories.length - 2}</span>
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="product-title">{product.title}</h3>
                  
                  {/* SKU */}
                  <p className="product-sku">SKU: {product.sku}</p>
                  
                  {/* Description */}
                  <p className="product-description">
                    {product.short_description || product.description.substring(0, 100)}
                    {product.description.length > 100 && '...'}
                  </p>

                  {/* Rating */}
                  <div className="product-rating">
                    <div className="stars">
                      {renderStars(product.ratings.average)}
                    </div>
                    <span className="rating-text">
                      {product.ratings.average.toFixed(1)} ({product.ratings.count} reviews)
                    </span>
                  </div>

                  {/* Price */}
                  <div className="product-price">
                    <span className="price-amount">
                      {formatPrice(product.price, product.currency)}
                    </span>
                  </div>

                  {/* Tags */}
                  {product.tags && product.tags.length > 0 && (
                    <div className="product-tags">
                      {product.tags.slice(0, 3).map(tag => (
                        <span key={tag} className="tag">#{tag}</span>
                      ))}
                    </div>
                  )}

                  {/* Add to Cart Button */}
                  <button 
                    className={`add-to-cart-btn ${!product.is_active ? 'disabled' : ''}`}
                    disabled={!product.is_active}
                  >
                    {product.is_active ? '🛒 Add to Cart' : 'Out of Stock'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="shop-footer">
        <div className="footer-content">
          <p>© 2024 Demo Shop - Powered by React & Node.js</p>
          <p>This is a demo showcasing product management capabilities</p>
        </div>
      </footer>
    </div>
  );
};

export default DemoShop;
