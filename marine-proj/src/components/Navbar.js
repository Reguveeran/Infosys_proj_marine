import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ user, onLogout }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    }
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <span className="logo-icon">🚢</span>
          Marine Analytics
        </Link>
        <ul className="navbar-menu">
          <li>
            <Link 
              to="/dashboard" 
              className={location.pathname === '/dashboard' ? 'active' : ''}
            >
              Dashboard
            </Link>
          </li>
          <li>
            <Link 
              to="/map" 
              className={location.pathname === '/map' ? 'active' : ''}
            >
              Map
            </Link>
          </li>
          <li>
            <Link 
              to="/vessels" 
              className={location.pathname === '/vessels' ? 'active' : ''}
            >
              Vessels
            </Link>
          </li>
          <li>
            <Link 
              to="/voyage-replay" 
              className={location.pathname === '/voyage-replay' ? 'active' : ''}
            >
              Voyage Replay
            </Link>
          </li>
          <li>
            <Link 
              to="/ports" 
              className={location.pathname === '/ports' ? 'active' : ''}
            >
              Ports
            </Link>
          </li>
          {user && user.isAdmin && (
            <li>
              <Link 
                to="/admin" 
                className={location.pathname === '/admin' ? 'active' : ''}
              >
                Admin
              </Link>
            </li>
          )}
        </ul>
        <div className="navbar-user">
          {user ? (
            <>
              <Link to="/profile" className="user-link">
                {user.name || user.email}
              </Link>
              <button onClick={handleLogout} className="logout-btn">
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="login-btn">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

