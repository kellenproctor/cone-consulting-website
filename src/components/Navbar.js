import React from 'react'
import { Link } from 'gatsby'
import logo from '../../public/img/Right.png'

const Navbar = class extends React.Component {

  componentDidMount() {
    // Get all "navbar-burger" elements
   const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);
    // Check if there are any navbar burgers
   if ($navbarBurgers.length > 0) {
 
     // Add a click event on each of them
     $navbarBurgers.forEach( el => {
       el.addEventListener('click', () => {
 
         // Get the target from the "data-target" attribute
         const target = el.dataset.target;
         const $target = document.getElementById(target);
 
         // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
         el.classList.toggle('is-active');
         $target.classList.toggle('is-active');
 
       });
     });
   }
 }
 
 render() {
   return (
  
  <nav className="navbar is-transparent" role="navigation" aria-label="main-navigation" style={{position: "absolute", top: "0", width: "100vw"}}>
    <div className="container">
      <div className="navbar-brand" style={{marginLeft: "2rem"}}>
        <Link to="/" className="navbar-item" title="Logo">
          <img src={logo} alt="Cone Consulting" style={{ maxHeight: "5rem", height:"5rem"}} />
        </Link>
        {/* Hamburger menu */}
        <div className="navbar-burger burger" data-target="navMenu" style={{marginRight: "2rem"}}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      <div id="navMenu" className="navbar-menu">
        <div className="navbar-end has-text-centered">
          <Link className="navbar-item is-size-4" to="/services">
            SERVICES
          </Link>
          <Link className="navbar-item is-size-4" to="/about">
            ABOUT
          </Link>
          <Link className="navbar-item is-size-4" to="/contact">
            CONTACT
          </Link>
          <Link className="navbar-item is-size-4" to="/contact/examples">
            Form Examples
          </Link>
        </div>
      </div>
    </div>
  </nav>
  )}
}

export default Navbar
