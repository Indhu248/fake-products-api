import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import './App.css';
import Dashboard from './pages/Dashboard';
import DemoShop from './components/DemoShop';

// Navigation component with active state
const Navigation = () => {
  const location = useLocation();
  
  return (
    <nav className="app-nav">
      <div className="nav-container">
        <div className="nav-brand">
          <h2>🛍️ Product Manager</h2>
        </div>
        <div className="nav-links">
          <Link 
            to="/" 
            className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
          >
            Admin Dashboard
          </Link>
          <Link 
            to="/demo" 
            className={`nav-link ${location.pathname === '/demo' ? 'active' : ''}`}
          >
            🛍️ Demo Shop
          </Link>
        </div>
      </div>
    </nav>
  );
};

function App() {
  return (
    <Router>
      <div className="App">
        <Navigation />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/demo" element={<DemoShop />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
