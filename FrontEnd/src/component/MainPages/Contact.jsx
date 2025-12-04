import React from 'react'
import { NavLink } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import '../../Styles/Contact.css'
import whatsappIcon from '../../assets/whatsapp.svg'
import facebookIcon from '../../assets/facebook.svg'
import instagramIcon from '../../assets/insta.svg'
import twitterIcon from '../../assets/twitter.svg'

const Contact = () => {
    const { register, handleSubmit, formState: { errors } } = useForm()

    const onSubmit = (data) => {
        alert("Message Sent Successfully...")
        location.reload()
    }

    return (
        <div className="contact-container009">
            <NavLink to="/" className="close-icon009">
                <span className="material-symbols-outlined">close</span>
            </NavLink>
            <div className="contact-info009">
                <h2>Contact Us</h2>
                <p>If you have any questions, feel free to reach out to us via email or phone. We are here to help you!</p>
                <div className="contact-details009">
                    <p><strong>Email:</strong> <a href="mailto:support@ecommerce.com?subject=Support Request&body=Hello, I need help with...">support@ecommerce.com</a></p>
                    <p><strong>Phone:</strong> +1 234 567 890</p>
                    <p><strong>Address:</strong> 123 E-commerce St, Shopsville, USA</p>
                </div>
            </div>
            <div className="social-media009">
                <h2>Follow Us</h2>
                <p><a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><img src={facebookIcon} alt="Facebook" className="social-icon009 white-icon009" /> Facebook</a></p>
                <p><a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><img src={twitterIcon} alt="Twitter" className="social-icon009 white-icon009" /> Twitter</a></p>
                <p><a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><img src={instagramIcon} alt="Instagram" className="social-icon009 white-icon009" /> Instagram</a></p>
            </div>
            <div className="map009">
                <h2>Our Location</h2>
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.835434509374!2d144.9537353153168!3d-37.81627977975195!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0xf577d1f9f3b1e0c!2sE-commerce%20St%2C%20Shopsville%2C%20USA!5e0!3m2!1sen!2s!4v1600000000000!5m2!1sen!2s"
                    width="600"
                    height="500"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                ></iframe>
            </div>
            <div className="contact-form009">
                <h2>Send us a message</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div id='formDiv009'>
                        <label htmlFor="name">Name:</label>
                        <input type="text" id="name" {...register('name', { required: true })} />
                        {errors.name && <span>This field is required</span>}
                    </div>
                    <div id='formDiv009'>
                        <label htmlFor="email">Email:</label>
                        <input type="email" id="email" {...register('email', { required: true })} />
                        {errors.email && <span>This field is required</span>}
                    </div>
                    <div id='formDiv009'>
                        <label htmlFor="message">Message:</label>
                        <textarea id="message" {...register('message', { required: true })}></textarea>
                        {errors.message && <span>This field is required</span>}
                    </div>
                    <button type="submit">Submit</button>
                </form>
            </div>
            <a href="https://wa.me/+923000000000" className="whatsapp-button009" target="_blank" rel="noopener noreferrer">
                <img src={whatsappIcon} alt="WhatsApp" />
                Chat on WhatsApp
            </a>
        </div>
    )
}

export default Contact
