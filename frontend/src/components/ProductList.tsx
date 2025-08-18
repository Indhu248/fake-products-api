import React from 'react';
import { Product } from '../types/product';
import './ProductList.css';

interface ProductListProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
  loading: boolean;
}

const ProductList: React.FC<ProductListProps> = ({ products, onEdit, onDelete, loading }) => {
  if (loading) {
    return <div className="loading">Loading products...</div>;
  }

  if (products.length === 0) {
    return <div className="no-products">No products found</div>;
  }

  return (
    <div className="product-list">
      <table className="product-table">
        <thead>
          <tr>
            <th>Image</th>
            <th>ID/SKU</th>
            <th>Title</th>
            <th>Price</th>
            <th>Categories</th>
            <th>Stock</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id || product.id}>
              <td className="product-image">
                {product.images.length > 0 && (
                  <img 
                    src={product.images[0]} 
                    alt={product.title}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = 'https://via.placeholder.com/50x50?text=No+Image';
                    }}
                  />
                )}
              </td>
              <td>
                <div className="product-id">
                  <div className="product-id-main">{product.id}</div>
                  <div className="product-sku">{product.sku}</div>
                </div>
              </td>
              <td>
                <div className="product-title">
                  <div className="title-main">{product.title}</div>
                  <div className="title-short">{product.short_description}</div>
                </div>
              </td>
              <td>
                <div className="product-price">
                  <span className="currency">{product.currency}</span>
                  <span className="amount">{product.price}</span>
                </div>
              </td>
              <td>
                <div className="product-categories">
                  {product.categories.map((category, index) => (
                    <span key={index} className="category-tag">
                      {category}
                    </span>
                  ))}
                </div>
              </td>
              <td>
                <div className="product-stock">
                  {product.variants.reduce((total, variant) => total + variant.stock, 0)}
                </div>
              </td>
              <td>
                <span className={`status-badge ${product.is_active ? 'active' : 'inactive'}`}>
                  {product.is_active ? 'Active' : 'Inactive'}
                </span>
              </td>
              <td>
                <div className="product-actions">
                  <button
                    className="btn btn-small btn-primary"
                    onClick={() => onEdit(product)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-small btn-danger"
                    onClick={() => onDelete(product.id)}
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;
