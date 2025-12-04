import React, { useEffect, useState } from 'react'
import { NavLink, useParams } from 'react-router-dom'
import axios from 'axios'
import '../../Styles/ViewDetail.css'
import Footer from '../SectionPages/Footer'

const ViewDetail = () => {
    const { id } = useParams()
    const [product, setProduct] = useState(null)

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/get/productdetail/${id}`)
                setProduct(response.data)
            } catch (error) {
                console.log("Error in fetching product details", error)
            }
        }
        fetchProduct()
    }, [id])

    const refreshToken = async () => {
        const oldToken = localStorage.getItem("token");
        if (!oldToken) {
            return false;
        }
        localStorage.removeItem("token");
        try {
            const response = await axios.get("http://localhost:3000/get/refreshToken", {
                headers: { Authorization: `Bearer ${oldToken}` }
            });
            localStorage.setItem("token", response.data.newToken);
            window.dispatchEvent(new Event("storage"));
            return true;
        } catch (error) {
            console.error("Token refresh failed from server side:", error);
            localStorage.clear();
            window.location.href = "/";
            return false;
        }
    };

    const HandleClick = async () => {
        const refreshed = await refreshToken();
        if (refreshed) {
            const token = localStorage.getItem("token");
            if (token) {
                try {
                    const response = await axios.post('http://localhost:3000/post/addtocart',
                        { productId: id },
                        { headers: { Authorization: `Bearer ${token}` } } // Correctly include the token in headers
                    );
                    if (response.data.success) {
                        alert(response.data.message); // Display success message to the user
                    } else {
                        console.error("Error: ", response.data.message); // Log any error messages from the server
                    }
                } catch (error) {
                    if (error.response?.status === 401) {
                        console.log("Token expired, refreshing...");
                    } else {
                        console.error("Error in Add to Cart:", error);
                    }
                }
            } else {
                console.log("No Token", token);
            }
        }
        else {
            alert("Please Login First");
            window.location.href = "/login";
        }
    }
    return (
        <div className='mainclass0015'>
            <div className="view-detail-container0015">
                {product ? (
                    <div className="product-detail0015">
                        <NavLink to="/" className="close-icon0015" style={{ marginTop: "15px" }}>
                            <span className="material-symbols-outlined">close</span>
                        </NavLink>
                        <div className="product-image-container0015">
                            <img
                                src={`http://localhost:3000/${product.productImage}`}
                                alt={product.productName}
                                className="product-image0015 hover-effect0015"
                            />
                        </div>
                        <div className="product-info0015">
                            <h2>{product.productName}</h2>
                            <p>{product.description}</p>
                            <p className="product-price0015">Price: ${product.productPrice}</p>
                            <p className="product-quantity0015">Quantity: {product.quantity}</p>
                            <div className="button-group0015">
                                <NavLink to={`/placeorder/${product._id}`}> <button className="place-order-btn0015">Place Order</button></NavLink>
                                <button className="add-to-cart-btn0015 hover-scale0015" onClick={HandleClick}>Add to Cart</button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <p>No product details available</p>
                )}
            </div>
            <div className='ViewFooter0015'>
                <Footer />
            </div>
        </div>
    )
}

export default ViewDetail