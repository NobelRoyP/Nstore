import React from 'react'
import './Css/Header.css'
import { Link } from 'react-router-dom'

function Header() {
  return (
    <>

      <div className="Nav">
        <h1><Link to='/'>Nstore</Link></h1>
        <div className='Options'>
          <a href="#" className='contact'>Contact</a>
          <a href="https://www.youtube.com/channel/UCAMNaRNK1eJxJsVdYUuuuQQ"><i className='icons fa-brands fa-youtube'></i></a>
          <Link to='/cart'><i className='icons fa-solid fa-shopping-cart'></i></Link>
        </div>
      </div>

    </>
  )
}

export default Header