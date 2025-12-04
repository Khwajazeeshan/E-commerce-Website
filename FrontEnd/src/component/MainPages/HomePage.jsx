import React from 'react'
import Navbar from '../SectionPages/Navbar'
import HeroSection from '../SectionPages/HeroSection'
import Footer from '../SectionPages/Footer'
import '../../Styles/HomePage.css';

const HomePage = () => {
    return (
        <div className="homepage-container">
            <div className="navbar-sidebar-container">
                <Navbar />
            </div>
            <div> <HeroSection /></div>
            <div> <Footer /></div>
        </div>
    )
}

export default HomePage
