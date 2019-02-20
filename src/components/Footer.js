import React from 'react'

const Footer = () => {
  return (
    <footer
      className="footer"
      style={{backgroundColor: `rgb(45, 54, 67)`}}>
      <div className="content has-text-centered has-text-white">
        <p>Cone Consulting Limited &copy; 2019</p>
        <a className="link" href="mailto:info@coneconsulting.com">
          info@coneconsulting.com
        </a>
      </div>
    </footer>
  )
}

export default Footer