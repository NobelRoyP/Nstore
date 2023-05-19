import React from "react";
import { Routes, Route } from 'react-router-dom'
import './Style.css'
import Header from './Components/Header'
import Body from './Components/Body'
import Cart from './Components/Cart'
import Contact from './Components/Contact'
import Admin from './Components/Admin'
import AdminView from './Components/AdminView'

function App() {
  return (
    <>
      <div>
        <Header/>
        <Routes>
            <Route path='/Contact' element={<Contact/>}></Route>
            <Route path="/" element={<Body/>}/>
            <Route path="/cart" element={<Cart />}/>
            <Route path='/admin' element={<Admin/>}/>
            <Route path='/adminview' element={<AdminView/>}/>
        </Routes>
      </div>
    </>
  );
}

export default App;
