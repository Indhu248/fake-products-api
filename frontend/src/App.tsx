import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Dashboard from './pages/Dashboard';
import DemoShop from './components/DemoShop';

function App() {
  return (
    <Router>
      <div className="App">
        {/* Navigation */}
        <nav className="app-nav">
          <div className="nav-container">
            <div className="nav-brand">
              <h2>🛍️ Product Manager</h2>
            </div>
            <div className="nav-links">
              <Link to="/" className="nav-link">Admin Dashboard</Link>
              <Link to="/demo" className="nav-link">Demo Shop</Link>
            </div>
          </div>
        </nav>

        {/* Routes */}
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/demo" element={<DemoShop />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
