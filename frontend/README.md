# Fake Products Dashboard Frontend

A modern React TypeScript dashboard for managing fake products database.

## Features

- **Product Management**: Create, read, update, and delete products
- **Bulk Import**: Import multiple products via JSON file or text input
- **Search & Filtering**: Search products by text and filter by categories
- **Responsive Design**: Mobile-friendly interface with modern UI/UX
- **Real-time Updates**: Instant feedback and data synchronization
- **Image Management**: Add/remove product images with URL inputs
- **Variant Management**: Handle product variants with color, size, and stock
- **Category System**: Organize products with hierarchical categories

## Tech Stack

- **React 18** with TypeScript
- **CSS3** with modern design patterns
- **Axios** for API communication
- **Responsive Design** with mobile-first approach

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Backend API running (see backend README)

## Installation

1. Install dependencies:
```bash
npm install
```

2. Set environment variables (optional):
Create a `.env` file in the root directory:
```bash
REACT_APP_API_URL=http://localhost:5000/api
```

3. Start the development server:
```bash
npm start
```

The application will open at [http://localhost:3000](http://localhost:3000).

## Available Scripts

- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run tests
- `npm run eject` - Eject from Create React App

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ProductList.tsx # Product table display
│   ├── ProductForm.tsx # Add/edit product form
│   └── BulkImport.tsx  # Bulk import interface
├── pages/              # Page components
│   └── Dashboard.tsx   # Main dashboard page
├── services/           # API services
│   └── api.ts         # API communication layer
├── types/              # TypeScript type definitions
│   └── product.ts     # Product and category interfaces
├── utils/              # Utility functions
└── App.tsx            # Main application component
```

## Component Overview

### Dashboard
The main page that orchestrates all functionality:
- Product listing with pagination
- Search and filtering
- Modal forms for adding/editing products
- Bulk import functionality

### ProductList
Displays products in a responsive table format:
- Product images, details, and metadata
- Action buttons for edit/delete operations
- Status indicators and stock information

### ProductForm
Comprehensive form for product management:
- All product fields with validation
- Dynamic image, tag, and variant management
- Responsive grid layout
- Form state management

### BulkImport
Interface for importing multiple products:
- File upload support
- JSON text input
- Sample data loading
- Validation and error handling

## API Integration

The frontend communicates with the backend through the `api.ts` service:

- **Products API**: CRUD operations, bulk import, search/filtering
- **Categories API**: Category management and retrieval
- **Error Handling**: Consistent error display and user feedback

## Styling

- **CSS Modules**: Component-specific styling
- **Responsive Design**: Mobile-first approach with breakpoints
- **Modern UI**: Clean, accessible interface with hover effects
- **Typography**: Inter font family for consistent branding

## Responsive Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Development

### Adding New Features
1. Create component in appropriate directory
2. Add TypeScript interfaces in `types/`
3. Implement API calls in `services/`
4. Add styling with component-specific CSS
5. Update main Dashboard if needed

### Code Style
- Use TypeScript for all components
- Follow React functional component patterns
- Use modern React hooks (useState, useEffect)
- Maintain consistent naming conventions
- Add proper error handling

## Production Build

To create a production build:

```bash
npm run build
```

This creates an optimized build in the `build/` directory ready for deployment.

## Deployment

The application can be deployed to any static hosting service:
- Vercel
- Netlify
- AWS S3
- GitHub Pages

Ensure the backend API is accessible from the deployment environment.

## Troubleshooting

### Common Issues

1. **API Connection Errors**: Check backend server is running
2. **Build Errors**: Clear node_modules and reinstall dependencies
3. **TypeScript Errors**: Ensure all imports and types are correct
4. **Styling Issues**: Check CSS file imports and class names

### Performance

- Use React.memo for expensive components
- Implement proper loading states
- Optimize image loading and caching
- Consider code splitting for large applications

## Contributing

1. Follow the existing code structure
2. Add proper TypeScript types
3. Include responsive design considerations
4. Test on multiple devices and browsers
5. Update documentation as needed

## License

This project is part of the Fake Products management system.
