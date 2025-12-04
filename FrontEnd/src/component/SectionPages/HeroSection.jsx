import axios from 'axios'
import React from 'react'
import '../../Styles/HeroSection.css'
import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'

const HeroSection = () => {
    const [products, setProducts] = useState([])

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:3000/get/Allproducts')
                setProducts(response.data)
            } catch (error) {
                console.log("Error in fetching products", error)
            }
        }
        fetchProducts()
    }, [])

    return (
        <div className='herosection0014'>
            <h1 className="hero-title0014">Buy & Sell Products 🛒</h1>
            <div className="hero-product-grid0014">
                {products.length === 0 ? (
                    <div className="no-products-message0014"><h2>No products available ❌</h2></div>
                ) : (
                    products.map((product, index) => (
                        <div key={product._id} className="hero-product-card0014" style={{ width: "auto", height: 'auto',  objectFit: "contain" }}>
                            <img src={`http://localhost:3000/${product.productImage}`} alt={product.productName} className="product-image0014" style={{ width: '98%', height: '160px' }} />
                            <span className="hero-product-name0014">{product.productName}</span>
                            <div>
                                <NavLink to={`/viewdetail/${product._id}`}>
                                    <button className="hero-button0014 add-to-cart0014">View Detail</button>
                                </NavLink>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}

export default HeroSection
