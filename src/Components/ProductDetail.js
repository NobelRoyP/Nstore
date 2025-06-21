import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { database } from '../Firebase';
import { doc, getDoc } from 'firebase/firestore';
import { CartContext } from '../CartContext';
import { UserContext } from '../UserContext';
import './Css/ProductDetail.css';

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();
  const { addToCart, cart } = useContext(CartContext);
  const { user } = useContext(UserContext);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const docRef = doc(database, 'products', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setProduct({ id: docSnap.id, ...docSnap.data() });
        } else {
          console.log('No such product!');
          navigate('/'); // Redirect to home if product not found
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [id, navigate]);

  if (!product) {
    return <div className="ProductDetail">Loading product details...</div>;
  }

  const isInCart = (productId) => {
    return cart.some(item => item.id === productId);
  };

  const handleAddToCart = () => {
    if (!user) {
      navigate('/login');
    } else {
      addToCart(product);
    }
  };

  return (
    <div className="ProductDetail">
      <button className="BackButton" onClick={() => navigate(-1)}>Back</button>
      <div className="DetailCard">
        <div className="Image">
          <img src={product.img} alt={product.ProductName} />
        </div>
        <div className="Details">
          <h2>{product.ProductName}</h2>
          <p><b>Price:</b> ₹ {product.Price}</p>
          <p><b>Color:</b> {product.Color}</p>
          <p><b>Description:</b> {product.Description || 'No description available.'}</p>
          {!isInCart(product.id) ? (
            <button className="AddToCart" onClick={handleAddToCart}>Add to Cart</button>
          ) : (
            <button className="CartButton DimGrey" onClick={() => navigate('/cart')}>Go to Cart</button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
