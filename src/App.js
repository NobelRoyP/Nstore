import React from "react";
import { Routes, Route } from 'react-router-dom'
import './Style.css'
import Header from './Components/Header'
import Body from './Components/Body'
import Cart from './Components/Cart'
import Contact from './Components/Contact'
import Admin from './Components/Admin'
import AdminView from './Components/AdminView'
import Login from './Components/Login';
import { CartProvider } from './CartContext';
import { UserProvider } from './UserContext';
import EditProduct from "./Components/EditProduct";
import ProductDetail from "./Components/ProductDetail";

function App() {
  return (
    <UserProvider>
      <CartProvider>
        <div>
          <Header/>
          <Routes>
              <Route path='/Contact' element={<Contact/>}></Route>
              <Route path="/" element={<Body/>}/>
              <Route path="/cart" element={<Cart />}/>
              <Route path="/login" element={<Login />} />
              <Route path='/admin' element={<Admin/>}/>
              <Route path='/adminview' element={<AdminView/>}/>
              <Route path='/editproduct/:id' element={<EditProduct/>}/>
              <Route path='/product/:id' element={<ProductDetail/>}/>
          </Routes>
        </div>
      </CartProvider>
    </UserProvider>
  );
}

export default App;
