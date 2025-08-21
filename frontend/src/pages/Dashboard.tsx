import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Product, Category } from '../types/product';
import { productsAPI, categoriesAPI } from '../services/api';
import ProductList from '../components/ProductList';
import ProductForm from '../components/ProductForm';
import BulkImport from '../components/BulkImport';
import './Dashboard.css';

const Dashboard: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [showBulkImport, setShowBulkImport] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      console.log('Fetching data...');
      
      const [productsResponse, categoriesResponse] = await Promise.all([
        productsAPI.getAll({
          page: currentPage,
          limit: 10,
          search: searchTerm || undefined,
          category: selectedCategory || undefined,
        }),
        categoriesAPI.getAll(),
      ]);

      console.log('Categories API Response:', categoriesResponse);
      console.log('Categories data:', categoriesResponse.data);
      console.log('Categories length:', categoriesResponse.data?.length);
      
      setProducts(productsResponse.data.products);
      setTotalPages(productsResponse.data.pagination.pages);
      setCategories(categoriesResponse.data);
      
      console.log('Categories state set:', categoriesResponse.data);
    } catch (err) {
      setError('Failed to fetch data');
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  }, [currentPage, searchTerm, selectedCategory]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleCreateProduct = async (productData: Omit<Product, '_id' | 'created_at' | 'updated_at'>) => {
    try {
      console.log('Creating product with data:', productData);
      const response = await productsAPI.create(productData);
      console.log('Product creation response:', response);
      setShowForm(false);
      fetchData();
    } catch (err) {
      console.error('Error creating product:', err);
      setError('Failed to create product');
    }
  };

  const handleUpdateProduct = async (id: string, productData: Partial<Product>) => {
    try {
      await productsAPI.update(id, productData);
      setEditingProduct(null);
      setShowForm(false);
      fetchData();
    } catch (err) {
      setError('Failed to update product');
      console.error('Error updating product:', err);
    }
  };

  const handleDeleteProduct = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await productsAPI.delete(id);
        fetchData();
      } catch (err) {
        setError('Failed to delete product');
        console.error('Error deleting product:', err);
      }
    }
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleBulkImport = async (productsData: string) => {
    try {
      const products = JSON.parse(productsData);
      await productsAPI.bulkCreate(products);
      setShowBulkImport(false);
      fetchData();
    } catch (err) {
      setError('Failed to import products. Please check the JSON format.');
      console.error('Error importing products:', err);
    }
  };

  const handleTestAPI = async () => {
    try {
      console.log('Testing API connection...');
      const response = await fetch('http://localhost:5000/api/health');
      const data = await response.json();
      console.log('Health check response:', data);
      alert('API is working! Check console for details.');
    } catch (error) {
      console.error('API test failed:', error);
      alert('API test failed! Check console for details.');
    }
  };

  if (loading && products.length === 0) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Fake Products Dashboard</h1>
        <div className="header-actions">
          <Link to="/demo" className="btn btn-demo">
            🛍️ View Demo Shop
          </Link>
          <button 
            className="btn btn-primary" 
            onClick={() => setShowForm(true)}
          >
            Add Product
          </button>
          <button 
            className="btn btn-secondary" 
            onClick={() => setShowBulkImport(true)}
          >
            Bulk Import
          </button>
          <button 
            className="btn btn-secondary" 
            onClick={handleTestAPI}
          >
            Test API
          </button>
        </div>
      </header>

      {error && (
        <div className="error-message">
          {error}
          <button onClick={() => setError(null)}>×</button>
        </div>
      )}

      <div className="dashboard-filters">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="category-select"
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category._id} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <ProductList
        products={products}
        onEdit={handleEditProduct}
        onDelete={handleDeleteProduct}
        loading={loading}
      />

      <div className="pagination">
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="btn btn-secondary"
        >
          Previous
        </button>
        <span className="page-info">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="btn btn-secondary"
        >
          Next
        </button>
      </div>

      {showForm && (
        <ProductForm
          product={editingProduct}
          categories={categories}
          onSubmit={editingProduct ? handleUpdateProduct : handleCreateProduct}
          onCancel={() => {
            setShowForm(false);
            setEditingProduct(null);
          }}
        />
      )}

      {showBulkImport && (
        <BulkImport
          onSubmit={handleBulkImport}
          onCancel={() => setShowBulkImport(false)}
        />
      )}
    </div>
  );
};

export default Dashboard;
