import React from 'react'
import { NavLink } from "react-router-dom";
import '../../Styles/About.css'

const About = () => {
    return (
        <>
            
            <div className="about-container0010">
            <NavLink to="/" className="close-icon0010">
                <span className="material-symbols-outlined">
                    close
                </span>
            </NavLink>
                <h1 className="about-title0010">About Us</h1>
                <h4 className="about-description0010">Welcome to our e-commerce website! We offer a wide range of products to cater to all your needs.</h4>
                <h2 className="about-subtitle0010">Our Mission</h2>
                <p className="about-text0010">Our mission is to provide high-quality products at competitive prices while ensuring excellent customer service.</p>
                <h2 className="about-subtitle0010">Our Products</h2>
                <p className="about-text0010">We offer a variety of products including electronics, fashion, home appliances, and more. All our products are sourced from trusted suppliers to ensure quality and reliability.</p>
                <h2 className="about-subtitle0010">Customer Satisfaction</h2>
                <p className="about-text0010">Customer satisfaction is our top priority. We strive to provide a seamless shopping experience with easy returns and prompt customer support.</p>
                <h2 className="about-subtitle0010">Contact Us</h2>
                <p className="about-text0010">If you have any questions or need assistance, feel free to contact our support team. We are here to help you!</p>
            </div>
        </>
    )
}

export default About
