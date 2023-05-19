import React from 'react'
import { useState, useEffect } from 'react'
import { useParams, useNavigate } from "react-router-dom"
import './Css/Admin.css'
import { database, storage } from '../Firebase'
import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/compact/storage'
import { addDoc, collection, serverTimestamp } from 'firebase/compact/firestore'

const InitialState = {
    ProductName: '',
    Price: '',
    Color: ''
}

function Admin() {

    const [data, setData] = useState(InitialState);
    const { ProductName, Price, Color } = data
    const [file, setFile] = useState(null);
    const [progress, setProgress] = useState(null);
    const [errors, setErrors] = useState({});
    const [isSubmit, setSubmit] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const UploadFile = () => {
            const name = new Date().getTime() + file.name;
            const storageRef = ref(storage, file.name);
            const UploadTask = uploadBytesResumable(storageRef, file);

            UploadTask.on("state_changed", (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setProgress(progress);
                switch (snapshot.state) {
                    case "paused":
                        console.log("paused");
                        break;
                    case "running":
                        console.log("running");
                        break;
                    default:
                        break;
                }
            }, (error) => {
                console.log(error);
            },
                () => {
                    getDownloadURL(UploadTask.snapshot.ref).then((downloadURL) => {
                        setData((prev) => ({ ...prev, img: downloadURL }));
                    })
                });
        }
        file && UploadFile();
    }, [file])

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    const validate = () => {
        let errors = {};
        if (!ProductName) {
            errors.ProductName = "Name is required"
        }
        if (!Price) {
            errors.Price = "Price is required"
        }
        if (!Color) {
            errors.Color = "Color is required"
        }

        return errors;
    }

    const handleSubmmit = async (e) => {
        e.preventDefault();
        let errors = validate();
        if (Object.keys(errors).length) return setErrors(errors);
        setSubmit(true);
        await addDoc(collection(database, "products"), {
            ...data,
            timestamp: serverTimestamp()
        })
        navigate("/adminview");
    }
    return (
        <>
            <div className='AdminBody'>
                <form className='InputFields' onSubmit={handleSubmmit} >
                    <div className='Field f1'>
                        <p>Product Name :</p>
                        <input type="text" placeholder='Enter Product Name' name='ProductName' onChange={handleChange} value={ProductName} error={errors.ProductName ? { content: errors.ProductName } : null} required />
                    </div>
                    <div className='Field f2'>
                        <p>Image :</p>
                        <input type='file' required onChange={(e) => setFile(e.target.files[0])} />
                    </div>
                    <div className='Field f3'>
                        <p>Colour :</p>
                        <input type='text' required placeholder='Enter Product Colour' name='Color' onChange={handleChange} value={Color} error={errors.Color ? { content: errors.Color } : null} />
                    </div>
                    <div className='Field f4'>
                        <p>Price :</p>
                        <input type="text" required placeholder='Enter Price' name='Price' onChange={handleChange} value={Price} error={errors.Price ? { content: errors.Price } : null} />
                    </div>
                    <input type="submit" disabled={progress !== null && progress < 100} />
                </form>
            </div>
        </>
    )
}

export default Admin