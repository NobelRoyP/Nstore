import React, { useContext, useEffect, useState } from 'react';
import './Css/Cart.css';
import { CartContext } from '../CartContext';
import { database } from '../Firebase';
import { collection, onSnapshot } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

function Cart() {
  const { cart, removeFromCart, updateCartItemQuantity } = useContext(CartContext);
  const [products, setProducts] = useState([]);
  const [isCartEmpty, setIsCartEmpty] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setIsCartEmpty(cart.length === 0);
  }, [cart]);

  useEffect(() => {
    const productsCollection = collection(database, 'products');
    const unsubscribe = onSnapshot(productsCollection, (snapshot) => {
      const productsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setProducts(productsData);
    });

    return () => unsubscribe();
  }, []);

  // Map cart items with product details from Firebase
  const cartWithDetails = cart.map(cartItem => {
    const product = products.find(p => p.id === cartItem.id);
    return {
      ...cartItem,
      ProductImage: product ? product.img : '',
      ProductName: product ? product.ProductName : '',
      Price: product ? Number(product.Price) : 0,
      quantity: cartItem.quantity ? Number(cartItem.quantity) : 1,
    };
  });

  const handleQuantityChange = (productId, event) => {
    const quantity = parseInt(event.target.value, 10);
    if (quantity > 0) {
      updateCartItemQuantity(productId, quantity);
    }
  };

  const handleRemove = (productId) => {
    removeFromCart(productId);
  };

  return (
    <div className='CartBody'>
      <div className='CartInner'>
        <h2>Cart</h2>
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <ul>
            {cartWithDetails.map((item) => (
              <li key={item.id} className="CartProduct">
                <div className="CartProductImage">
                  {item.ProductImage ? (
                    <img
                      src={item.ProductImage}
                      alt={item.ProductName}
                      onLoad={(e) => e.target.classList.add('loaded')}
                    />
                  ) : (
                    <div className="CartProductImageLoader">Loading...</div>
                  )}
                </div>
                <div className="CartProductDetails">
                  <div className="CartProductTitle">{item.ProductName}</div>
                  <div className="CartProductQuantity">
                    <label>Quantity:</label>
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) => handleQuantityChange(item.id, e)}
                      min="1"
                    />
                  </div>
                  <button className="CartProductRemove" onClick={() => handleRemove(item.id)}>Remove</button>
                </div>
                <div className="CartProductPrice">₹{item.Price}</div>
              </li>
            ))}
          </ul>
        )}
        <div className="CartTotal">
          Total: ₹{cartWithDetails.reduce((total, item) => total + item.Price * item.quantity, 0)}
        </div>
        <button
          className={`CartCheckout ${isCartEmpty ? 'CartCheckout--disabled' : ''}`}
          onClick={() => navigate('/checkout')}
          disabled={isCartEmpty}
        >
          Checkout
        </button>
      </div>
    </div>
  );
}

export default Cart;
