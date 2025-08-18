# Fake Products API & Dashboard

A full-stack application for managing product data with a React frontend dashboard and Node.js backend API.

## 🚀 Features

- **Product Management**: Create, read, update, and delete products
- **Category Management**: 65+ predefined categories across 12 main categories
- **Bulk Import**: Import multiple products via JSON
- **Search & Filter**: Search products by name, filter by category
- **Responsive Design**: Mobile-friendly dashboard
- **MongoDB Integration**: Persistent data storage
- **RESTful API**: Clean API endpoints for external use

## 📁 Project Structure

```
fake-products/
├── backend/          # Node.js + Express API
├── frontend/         # React + TypeScript Dashboard
├── README.md         # This file
└── DEPLOYMENT.md     # Deployment instructions
```

## 🛠️ Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **CORS** - Cross-origin resource sharing

### Frontend
- **React 18** - UI library
- **TypeScript** - Type safety
- **Axios** - HTTP client
- **CSS3** - Styling

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- Git

### Backend Setup
```bash
cd backend
npm install
cp config.env.example config.env
# Edit config.env with your MongoDB URI
npm run seed  # Populate database with sample data
npm start
```

### Frontend Setup
```bash
cd frontend
npm install
npm start
```

## 📊 API Endpoints

### Products
- `GET /api/products` - Get all products (with pagination)
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create new product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product
- `POST /api/products/bulk` - Bulk create products

### Categories
- `GET /api/categories` - Get all categories
- `GET /api/categories/:id` - Get single category
- `POST /api/categories` - Create new category
- `PUT /api/categories/:id` - Update category
- `DELETE /api/categories/:id` - Delete category

### Health Check
- `GET /api/health` - API health status

## 🗄️ Database Schema

### Product Schema
```javascript
{
  id: String,           // Unique product ID
  sku: String,          // Stock keeping unit
  title: String,        // Product title
  description: String,  // Full description
  short_description: String,
  price: Number,        // Product price
  currency: String,     // Currency code
  categories: [String], // Category names
  images: [String],     // Image URLs
  variants: [{          // Product variants
    variant_id: String,
    color: String,
    size: String,
    stock: Number
  }],
  ratings: {            // Product ratings
    average: Number,
    count: Number
  },
  tags: [String],       // Product tags
  is_active: Boolean    // Product status
}
```

### Category Schema
```javascript
{
  name: String,         // Category name
  slug: String,         // URL-friendly name
  description: String,  // Category description
  parent_category: ObjectId, // Parent category reference
  is_active: Boolean    // Category status
}
```

## 🌐 Deployment

### Backend Deployment
- **Render**: Use `render.yaml` configuration
- **Railway**: Use `railway.json` configuration  
- **Heroku**: Use `Procfile` configuration

### Frontend Deployment
- **Vercel**: Use `vercel.json` configuration
- **Netlify**: Use `netlify.toml` configuration

See `DEPLOYMENT.md` for detailed deployment instructions.

## 🔧 Environment Variables

### Backend (.env)
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/fake-products
JWT_SECRET=your-secret-key
NODE_ENV=development
```

### Frontend (.env)
```env
REACT_APP_API_URL=http://localhost:5000/api
```

## 📝 Available Scripts

### Backend
```bash
npm start          # Start production server
npm run dev        # Start development server
npm run seed       # Seed database with sample data
```

### Frontend
```bash
npm start          # Start development server
npm run build      # Build for production
npm test           # Run tests
```

## 🎯 Features in Detail

### Product Management
- ✅ Create products with all required fields
- ✅ Edit existing products
- ✅ Delete products with confirmation
- ✅ Bulk import products via JSON
- ✅ Search products by title/description
- ✅ Filter products by category
- ✅ Pagination support

### Category System
- ✅ 65+ predefined categories
- ✅ 12 main category groups
- ✅ Search categories in form
- ✅ Multiple category selection
- ✅ Category hierarchy support

### User Experience
- ✅ Responsive design
- ✅ Form validation
- ✅ Real-time error feedback
- ✅ Loading states
- ✅ Character counters
- ✅ Image preview
- ✅ Tag management

## 🔒 Security Features

- CORS configuration
- Input validation
- Error handling
- Environment variable protection

## 📈 Performance

- Database indexing
- Pagination
- Efficient queries
- Optimized React components

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🆘 Support

If you encounter any issues or have questions:
1. Check the documentation
2. Review the deployment guide
3. Open an issue on GitHub

## 🔗 Links

- **Live Demo**: [Coming Soon]
- **API Documentation**: [Coming Soon]
- **Deployment Guide**: See `DEPLOYMENT.md`

---

**Built with ❤️ using Node.js, Express, MongoDB, React, and TypeScript**
