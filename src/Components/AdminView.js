import React, { useEffect, useState } from 'react'
import './Css/Body.css'
import { database } from '../Firebase'
import { useNavigate } from 'react-router-dom'
import { collection, onSnapshot } from 'firebase/firestore';


import { Link } from 'react-router-dom';

function Body() {
    const [product, setProduct] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true);
        const unsub = onSnapshot(collection(database, "products"), (snapshot) => {
            let list = [];
            snapshot.docs.forEach((doc) => {
                list.push({ id: doc.id, ...doc.data() })
            })
            setProduct(list);
            setLoading(false)
        },
            (error) => {
                console.log(error);
            }
        )
        return () => {
            unsub();
        }
    }, [])
    return (
        <>
            <div className='Home'>
                {product && product.map((item) => (
                    <>
                        <div className='Card' key={item.id}>
                            <div className='Image'>
                                <img src={item.img} />
                            </div>
                            <div className='Details'>
                                <div className='DetailContent'>
                                    <p className='Price'><b>₹ {item.Price}</b></p>
                                    <p><b>{item.ProductName}</b></p>
                                    <p><b>{item.Color}</b></p>
                                    <Link to={`/editproduct/${item.id}`} className="edit-button">Edit</Link>
                                </div>
                            </div>
                        </div>
                    </>
                ))}
            </div >
        </>
    )
}

export default Body