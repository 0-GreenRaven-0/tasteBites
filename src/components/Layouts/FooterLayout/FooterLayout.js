import {FaFacebook, FaInstagram, FaTwitter, FaWhatsapp} from 'react-icons/fa'
import logo from './tasteBites.png'
import './FooterLayout.css'

const FooterLayout = () => {
  return (
    <footer className='footer'> 
        <div className='footer-top'>

            <div className='footer-left'>
              <img src={logo} width={150} height={150} className='footer-logo'/>
            </div>

          <div className='footer-middle'>
            <ul>
              <li>About Us</li>
              <li>Customer Support</li>
              <li>Submit a report</li>
            </ul>
          </div>
          
          <div className='footer-right'>
              <ul>
              <li>Wanna work with us?</li>
              <li>Resources</li>
              <li>Reach us</li>
            </ul>
          </div>
        </div>
        <div className='footer-line-breaker'/>

        <div className='footer-bottom'>
          <div className='social-icon-container'>
            <FaFacebook className='social-icon facebook'/>
            <FaInstagram className='social-icon instagram'/>
            <FaTwitter className='social-icon twitter'/>
            <FaWhatsapp className='social-icon whatsapp'/>
          </div>
          <br/>
          <h3 className='rights'>&copy;Copyright All rights are reserved</h3>
        </div>
    </footer>
  )
}

export default FooterLayout
