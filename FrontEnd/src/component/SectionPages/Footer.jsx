import React from 'react';
import '../../Styles/Footer.css';
import { FaFacebook, FaTwitter, FaInstagram, FaPhone, FaEnvelope, FaMapMarkerAlt, FaWhatsapp } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="footer0012">
            <div className="footer-container0012">
                <div className="footer-section0012">
                    <h4>Company</h4>
                    <ul>
                        <li><a href="/about" target="_blank" rel="noopener noreferrer">About Us</a></li>
                        <li><a href="/" target="_blank" rel="noopener noreferrer">Careers</a></li>
                        <li><a href="/" target="_blank" rel="noopener noreferrer">Press</a></li>
                    </ul>
                </div>
                <div className="footer-section0012">
                    <h4>Customer Service</h4>
                    <ul>
                        <li><a href="/contact" target="_blank" rel="noopener noreferrer"><FaPhone /> Contact Us</a></li>
                        <li><a href="/" target="_blank" rel="noopener noreferrer"><FaEnvelope /> Order Tracking</a></li>
                        <li><a href="/" target="_blank" rel="noopener noreferrer"><FaMapMarkerAlt /> Returns</a></li>
                    </ul>
                </div>
                <div className="footer-section0012">
                    <h4>About Us</h4>
                    <ul>
                        <li><a href="/" target="_blank" rel="noopener noreferrer">Our Story</a></li>
                        <li><a href="/" target="_blank" rel="noopener noreferrer">Mission & Values</a></li>
                        <li><a href="/" target="_blank" rel="noopener noreferrer">Leadership</a></li>
                    </ul>
                </div>
                <div className="footer-section0012">
                    <h4>Create Online Store</h4>
                    <ul>
                        <li><a href="/" target="_blank" rel="noopener noreferrer">Start Selling</a></li>
                        <li><a href="/" target="_blank" rel="noopener noreferrer">Pricing</a></li>
                        <li><a href="/" target="_blank" rel="noopener noreferrer">Success Stories</a></li>
                    </ul>
                </div>
                <div className="footer-section0012 follow-us0012">
                    <h4>Follow Us</h4>
                    <ul className="social-media0012" id='social0012'>
                        <li><a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebook size={24} /></a></li>
                        <li><a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter size={24} /></a></li>
                        <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram size={24} /></a></li>
                    </ul>
                </div>
            </div>
            <div className="footer-bottom0012">
                <p className='p0012'>&copy; 2025 E-commerce Buy and Sell Products Website. All rights reserved.</p>
            </div>
        </footer>
    );
}

export default Footer;
