import React from 'react'
import { Link } from 'gatsby'
import logo from '../../static/img/Right.png'

const navItems = [
  {
    title: "SERVICES",
    path: "/services"
  },
  {
    title: "ABOUT US",
    path: "/about"
  },
  {
    title: "ABOUT CPT",
    path: "/about-cpt"
  },
]

const navLinks = navItems.map((item) => {
  return (
    <Link  className="navbar-item is-size-5 has-text-white" to={item.path} key={item.title}>
      {item.title}
    </Link>
  )
})

const navStyle = {
  position: "absolute",
  top: "0",
  width: "100vw",
  background: `linear-gradient(rgba(45, 54, 67, 0.8), rgba(45, 54, 67, 0.5))`
}

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
  <nav
    className="navbar is-transparent"
    role="navigation"
    aria-label="main-navigation"
    style={navStyle} >
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
          {navLinks}
          <Link 
            className="navbar-item button is-size-5 has-text-white" to="/contact" id="nav-button"
            style={{margin: "auto", backgroundColor: "transparent", borderWidth: "2px", borderRadius: "0"}} >
            CONTACT US
          </Link>
        </div>
      </div>
    </div>
  </nav>
  )}
}

export default Navbar
