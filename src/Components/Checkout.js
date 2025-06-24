import React, { useState, useContext } from 'react';
import { CartContext } from '../CartContext';
import './Css/Checkout.css';
import StripePayment from './StripePayment';

function Checkout() {
  const { cart } = useContext(CartContext);
  const [fullName, setFullName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [pincode, setPincode] = useState('');
  const [digipin, setDigipin] = useState('');
  const [selectedItems, setSelectedItems] = useState(cart.map(item => item.id));
  const [fullNameTouched, setFullNameTouched] = useState(false);
  const [addressTouched, setAddressTouched] = useState(false);
  const [cityTouched, setCityTouched] = useState(false);
  const [pincodeTouched, setPincodeTouched] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);

  const handleItemSelection = (itemId) => {
    setSelectedItems(prevItems =>
      prevItems.includes(itemId) ? prevItems.filter(id => id !== itemId) : [...prevItems, itemId]
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    setFullNameTouched(true);
    setAddressTouched(true);
    setCityTouched(true);
    setPincodeTouched(true);

    if (!fullName || !address || !city || !pincode) {
      return;
    }

    setOrderConfirmed(true);
    const selectedCartItems = cart.filter(item => selectedItems.includes(item.id));
    alert('Order confirmed!');
  };

  return (
    <div className="checkout-container">
      <h2>Checkout</h2>
      <h3>Review Your Order</h3>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {cart.map((item) => (
            <li key={item.id} className="checkout-item">
              <input
                type="checkbox"
                id={`item-${item.id}`}
                checked={selectedItems.includes(item.id)}
                onChange={() => handleItemSelection(item.id)}
              />
              <label htmlFor={`item-${item.id}`}>
                {item.ProductName} - Quantity: {item.quantity} - Price: ₹{item.Price}
              </label>
            </li>
          ))}
          <label>
            TOTAL: ₹{cart.filter(item => selectedItems.includes(item.id)).reduce((total, item) => total + (item.Price * item.quantity), 0)}
          </label>
        </ul>
      )}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="fullName" className={fullNameTouched && !fullName ? 'required-field' : ''}>Full Name{fullNameTouched && !fullName ? '**' : ''}:</label>
          <input
            type="text"
            id="fullName"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="address" className={addressTouched && !address ? 'required-field' : ''}>Address{addressTouched && !address ? '**' : ''}:</label>
          <input
            type="text"
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="city" className={cityTouched && !city ? 'required-field' : ''}>City{cityTouched && !city ? '**' : ''}:</label>
          <input
            type="text"
            id="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="pincode" className={pincodeTouched && !pincode ? 'required-field' : ''}>Pincode{pincodeTouched && !pincode ? '**' : ''}:</label>
          <input
            type="text"
            id="pincode"
            value={pincode}
            onChange={(e) => setPincode(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="digipin">Digipin (Optional):</label>
          <input
            type="text"
            id="digipin"
            value={digipin}
            onChange={(e) => setDigipin(e.target.value)}
          />
        </div>
        <button type="submit">Confirm Order</button>
      </form>
      {orderConfirmed && <StripePayment />}
    </div>
  );
}

export default Checkout;
