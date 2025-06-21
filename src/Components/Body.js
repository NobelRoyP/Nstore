import React, { useEffect, useState, useContext } from 'react'
import './Css/Body.css'
import { database } from '../Firebase'
import { collection, onSnapshot } from 'firebase/firestore';
import { CartContext } from '../CartContext';
import { UserContext } from '../UserContext';
import { useNavigate } from 'react-router-dom';

function Body() {
    const [product, setProduct] = useState([]);
    // const [loading, setLoading] = useState(false);
    const { cart, addToCart } = useContext(CartContext);
    const { user } = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        // setLoading(true);
        const unsub = onSnapshot(collection(database, "products"), (snapshot) => {
            let list = [];
            snapshot.docs.forEach((doc) => {
                list.push({ id: doc.id, ...doc.data() })
            })
            setProduct(list);
            // setLoading(false)
        },
            (error) => {
                console.log(error);
            }
        )
        return () => {
            unsub();
        }
    }, [])

    const isInCart = (productId) => {
        return cart.some(item => item.id === productId);
    }

    return (
        <>
            <div className='Home'>
                {product && product.map((item) => (
                    <div key={item.id}>
                    <div className='Card' onClick={() => navigate(`/product/${item.id}`)} style={{ cursor: 'pointer' }}>
                        <div className='Image'>
                            <img src={item.img} alt='' />
                        </div>
                        <div className='Details'>
                            <div className='DetailContent'>
                                <p className='Price'><b>₹ {item.Price}</b></p>
                                <p><b>{item.ProductName}</b></p>
                                <p><b>{item.Color}</b></p>
                                {!isInCart(item.id) ? (
                                    <button className='AddToCart' onClick={(e) => {
                                        e.stopPropagation();
                                        if (!user) {
                                            navigate('/login');
                                        } else {
                                            addToCart(item);
                                        }
                                    }}>Add to Cart</button>
                                ) : (
                                    <button className='CartButton' onClick={(e) => {
                                        e.stopPropagation();
                                        navigate('/cart');
                                    }}>Go to Cart</button>
                                )}
                            </div>
                        </div>
                    </div>
                    </div>
                ))}
            </div>
        </>
    )
}

export default Body
