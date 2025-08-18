import React, { useState } from 'react';
import './BulkImport.css';

interface BulkImportProps {
  onSubmit: (productsData: string) => void;
  onCancel: () => void;
}

const BulkImport: React.FC<BulkImportProps> = ({ onSubmit, onCancel }) => {
  const [jsonData, setJsonData] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!jsonData.trim()) {
      setError('Please enter JSON data');
      return;
    }

    try {
      // Validate JSON format
      JSON.parse(jsonData);
      setError(null);
      onSubmit(jsonData);
    } catch (err) {
      setError('Invalid JSON format. Please check your data.');
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target?.result as string;
        setJsonData(content);
        setError(null);
      };
      reader.readAsText(file);
    }
  };

  const loadSampleData = () => {
    const sampleData = [
      {
        "id": "prod_1004",
        "sku": "WATCH-BLK-004",
        "title": "Classic Black Watch",
        "description": "Elegant black watch with leather strap and minimalist design. Perfect for formal and casual occasions.",
        "short_description": "Elegant black watch with leather strap.",
        "price": 2999,
        "currency": "INR",
        "categories": ["Accessories", "Watches"],
        "images": [
          "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=500&h=500&fit=crop"
        ],
        "variants": [
          {
            "variant_id": "v1",
            "color": "Black",
            "size": "Standard",
            "stock": 15
          }
        ],
        "ratings": {
          "average": 4.3,
          "count": 67
        },
        "tags": ["watch", "formal", "leather"],
        "is_active": true
      }
    ];
    setJsonData(JSON.stringify(sampleData, null, 2));
    setError(null);
  };

  return (
    <div className="modal-overlay">
      <div className="modal bulk-import-modal">
        <div className="modal-header">
          <h2>Bulk Import Products</h2>
          <button className="close-btn" onClick={onCancel}>×</button>
        </div>
        
        <form onSubmit={handleSubmit} className="bulk-import-form">
          <div className="form-group">
            <label>Upload JSON File</label>
            <input
              type="file"
              accept=".json"
              onChange={handleFileUpload}
              className="file-input"
            />
            <small>Upload a JSON file or paste JSON data below</small>
          </div>

          <div className="form-group">
            <label>Or Paste JSON Data</label>
            <textarea
              value={jsonData}
              onChange={(e) => setJsonData(e.target.value)}
              placeholder="Paste your JSON data here..."
              rows={15}
              className="json-textarea"
            />
            <small>
              Expected format: Array of product objects with the same structure as individual products
            </small>
          </div>

          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          <div className="form-actions">
            <button type="button" onClick={loadSampleData} className="btn btn-secondary">
              Load Sample
            </button>
            <button type="button" onClick={onCancel} className="btn btn-secondary">
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Import Products
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BulkImport;
