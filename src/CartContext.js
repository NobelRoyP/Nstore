import React, { createContext, useState, useEffect, useContext } from 'react';
import { database } from './Firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { UserContext } from './UserContext';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user, loading } = useContext(UserContext);
  const [cart, setCart] = useState([]);
  const [isCartLoaded, setIsCartLoaded] = useState(false);

  useEffect(() => {
    const loadCart = async () => {
      if (user && !loading) {
        const docRef = doc(database, 'carts', user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          console.log('Loaded cart from Firestore:', docSnap.data().items);
          setCart(docSnap.data().items || []);
        } else {
          console.log('No cart found in Firestore for user:', user.uid);
          setCart([]);
        }
        setIsCartLoaded(true);
      } else if (!loading) {
        setCart([]);
        setIsCartLoaded(true);
      }
    };
    loadCart();
  }, [user, loading]);

  useEffect(() => {
    const saveCart = async () => {
      if (user && isCartLoaded) {
        console.log('Saving cart to Firestore:', cart);
        const docRef = doc(database, 'carts', user.uid);
        try {
          await setDoc(docRef, { items: cart });
          console.log('Cart saved successfully');
        } catch (error) {
          console.error('Error saving cart:', error);
        }
      }
    };
    saveCart();
  }, [cart, user, isCartLoaded]);

  useEffect(() => {
    if (!user) {
      // User logged out, clear cart without saving empty cart to Firestore
      setCart([]);
      setIsCartLoaded(false);
    }
  }, [user]);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingProductIndex = prevCart.findIndex(item => item.id === product.id);
      if (existingProductIndex !== -1) {
        // Product exists, increment quantity
        const updatedCart = [...prevCart];
        const existingProduct = updatedCart[existingProductIndex];
        const newQuantity = (existingProduct.quantity ? existingProduct.quantity : 1) + 1;
        updatedCart[existingProductIndex] = { ...existingProduct, quantity: newQuantity };
        return updatedCart;
      } else {
        // Add new product with quantity 1
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter((product) => product.id !== productId));
  };

  const updateCartItemQuantity = (productId, quantity) => {
    setCart(cart.map((product) =>
      product.id === productId ? { ...product, quantity: quantity } : product
    ));
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateCartItemQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};
