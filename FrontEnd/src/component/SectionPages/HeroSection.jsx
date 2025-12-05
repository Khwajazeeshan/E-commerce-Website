import axios from 'axios'
import React from 'react'
import '../../Styles/HeroSection.css'
import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'

const HeroSection = () => {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true)
                const response = await axios.get('http://localhost:3000/get/Allproducts')
                setProducts(response.data)
            } catch (error) {
                console.log("Error in fetching products", error)
            } finally {
                setLoading(false)
            }
        }
        fetchProducts()
    }, [])

    return (
        <div className='herosection0014'>
            <h1 className="hero-title0014">Discover Amazing Products 🛒</h1>
            <div className="hero-product-grid0014">
                {loading ? (
                    // Loading skeleton
                    Array(8).fill(0).map((_, index) => (
                        <div key={index} className="hero-product-card0014">
                            <div className="product-image-container0014 product-skeleton"></div>
                            <div className="product-info0014">
                                <div className="hero-product-name0014 product-skeleton" style={{ height: '24px', borderRadius: '4px' }}></div>
                            </div>
                        </div>
                    ))
                ) : products.length === 0 ? (
                    <div className="no-products-message0014">
                        <h2>No products available yet ✨</h2>
                        <p>Check back soon for amazing deals!</p>
                    </div>
                ) : (
                    products.map((product) => (
                        <div key={product._id} className="hero-product-card0014">
                            <div className="product-image-container0014">
                                <img
                                    src={`http://localhost:3000/${product.productImage}`}
                                    alt={product.productName}
                                    className="product-image0014"
                                />
                            </div>
                            <div className="product-info0014">
                                <h3 className="hero-product-name0014">{product.productName}</h3>
                                <NavLink to={`/viewdetail/${product._id}`}>
                                    <button className="hero-button0014">View Details</button>
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
