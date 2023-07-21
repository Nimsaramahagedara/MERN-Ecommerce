import React from 'react'
import { Link } from 'react-router-dom'
import {BsLinkedin, BsFacebook, BsInstagram, BsYoutube,BsTwitter} from 'react-icons/bs'

export const Footer = () => {
  return (
    <>
    <footer className='py-4'>
      <div className="container-xxl">
        <div className="row align-items-center">
          <div className="col-5">
            <div className="footer-top-data d-flex gap-30 align-items-center">
                <img src="images/newsletter.png" alt="" />
                <h3 className='text-white mb-0'>Sign up for news letter</h3>
            </div>
          </div>
          <div className="col-7">
          <div className="input-group input-group-lg">
                        <input 
                        type="text" 
                        className="form-control py-1" 
                        placeholder="Your Email Address" 
                        aria-label="Your Email Address" 
                        aria-describedby="basic-addon2"/>
                        <span className="input-group-text p-2" id="basic-addon2">Subscribe</span>
                    </div>
          </div>
        </div>
      </div>
    </footer>
    <footer className='py-3'>
      <div className="container-xxl">
        <div className="row">
          <div className="col-4">
            <h4 className='mb-4 text-white'>Contact us</h4>
            <div className='footer-links d-flex flex-column'>
              <address className='text-white mb-0'>No:03 <br/>Kahagala South,<br/>Kamburupitiya,<br/>Matara</address>
              <a href="tel:0763355762" className='mt-3 text-white mb-0 d-block'>0763355762</a>
              <a href="mailto:nimsaramahagedara@gmail.com" className='mt-1 text-white mb-3 d-block'>nimsaramahagedara@gmail.com</a>
              <div className="social-icons d-flex align-items-center gap-30">
                <a href="/" className='text-white'><BsFacebook className='fs-4'/></a>
                <a href="/" className='text-white'><BsInstagram className='fs-4'/></a>
                <a href="/" className='text-white'><BsLinkedin className='fs-4'/></a>
                <a href="/" className='text-white'><BsYoutube className='fs-4'/></a>
                <a href="/" className='text-white'><BsTwitter className='fs-4'/></a>
              </div>
            </div>
          </div>
          <div className="col-3">
            <h4 className='mb-4 text-white'>Information</h4>
            <div className='footer-links d-flex flex-column'>
              <Link to='/' className='text-white mb-1 py-2'>Privacy Policy</Link>
              <Link to='/' className='text-white mb-1 py-2'>Refund Policy</Link>
              <Link to='/' className='text-white mb-1 py-2'>Shipping Policy</Link>
              <Link to='/' className='text-white mb-1 py-2'>Terms of service</Link>
              <Link to='/' className='text-white mb-1 py-2'>Blogs</Link>
            </div>
          </div>
          <div className="col-3">
            <h4 className='mb-4 text-white'>Account</h4>
            <div className='footer-links d-flex flex-column'>
              <Link to='/' className='text-white mb-1 py-2'>Search</Link>
              <Link to='/' className='text-white mb-1 py-2'>About Us</Link>
              <Link to='/' className='text-white mb-1 py-2'>FAQ</Link>
              <Link to='/' className='text-white mb-1 py-2'>Contact Us</Link>
              <Link to='/' className='text-white mb-1 py-2'>Size Chart</Link>
            </div>
          </div>
          <div className="col-2">
            <h4 className='mb-4 text-white'>Quick Links</h4>
            <div className='footer-links d-flex flex-column'>
              <Link to='/' className='text-white mb-1 py-2'>Accessories</Link>
              <Link to='/' className='text-white mb-1 py-2'>Laptop</Link>
              <Link to='/' className='text-white mb-1 py-2'>Headphone</Link>
              <Link to='/' className='text-white mb-1 py-2'>Tablet</Link>
              <Link to='/' className='text-white mb-1 py-2'>Watch</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
    <footer className='py-3'>
      <div className="container-xxl">
        <div className="row">
          <div className="col-12">
            <p className='text-white mb-0 text-center'>&copy; Nimsara Mahagedara {new Date().getFullYear} Powered By React Bootstrap </p>
          </div>
        </div>
      </div>
    </footer>
    </>
  )
}
