import React, { useContext, useState, useRef, useEffect } from 'react';
import './Css/Header.css';
import { Link } from 'react-router-dom';
import { UserContext } from '../UserContext';
import { CartContext } from '../CartContext';

function Header() {
  const { user, logout } = useContext(UserContext);
  const { cart } = useContext(CartContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = async () => {
    try {
      await logout();
      setDropdownOpen(false);
    } catch (err) {
      console.error(err.message);
    }
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <>
      <div className="Nav">
        <h1><Link to="/">Nstore</Link></h1>
        <div className="Options">
          <Link to="/cart" className="cart-link">
            <i className="icons fa-solid fa-shopping-cart"></i>
            {cart.length > 0 && <span className="cart-badge">{cart.length}</span>}
          </Link>
          {user ? (
            <div className="user-dropdown" ref={dropdownRef}>
              <button onClick={toggleDropdown} className="profile-button" title="Profile">
                <i className="icons fa-solid fa-user"></i>
              </button>
              {dropdownOpen && (
                <div className="dropdown-menu">
                  <Link to="/Contact" className="dropdown-item" onClick={() => setDropdownOpen(false)}>Contact</Link>
                  <button onClick={handleLogout} className="dropdown-item">Logout</button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="auth-button">Login</Link>
          )}
        </div>
      </div>
    </>
  );
}

export default Header;
