import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../myCocktailLogo.png'

const Navbar = () => {
  return (
    <nav className='navbar'>
      <div className='nav-center'>
        <Link to="/">
          <img src={logo} alt='Cocktail Logo' className='logo'/>
        </Link>
        <ul className='nav-links'>
          <Link to="/">
            Home
          </Link>
          <Link to="/about">
            About
          </Link>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
