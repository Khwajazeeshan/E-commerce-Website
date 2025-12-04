import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../Styles/AddtoCart.css';
import { NavLink } from 'react-router-dom';

const AddtoCart = () => {
    const [cartData, setCartData] = useState([]);

    const refreshToken = async () => {
        const oldToken = localStorage.getItem("token");
        localStorage.removeItem("token");
        try {
            const response = await axios.get("http://localhost:3000/get/refreshToken", {
                headers: { Authorization: `Bearer ${oldToken}` }
            });
            localStorage.setItem("token", response.data.newToken);
            window.dispatchEvent(new Event("storage"));
            return true;
        } catch (error) {
            localStorage.clear();
            return false;
        }
    };

    useEffect(() => {
        const fetchCartData = async () => {
            const refreshed = await refreshToken();
            if (refreshed) {
                const token = localStorage.getItem('token');
                if (!token) {
                    console.error('No JWT token found');
                    return;
                }
                try {
                    const response = await axios.get('http://localhost:3000/get/addtoCart', {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    setCartData(response.data);
                } catch (error) {
                    console.error('Error fetching cart data:', error);
                }
            } else {
                console.log("Token Expired!!!");
            }
        };
        fetchCartData();
    }, []);

    const HandleClick = async (productId) => {
        const refreshed = await refreshToken();
        if (refreshed) {
            const token = localStorage.getItem("token");
            if (token) {
                try {
                    const response = await axios.delete(
                        `http://localhost:3000/delete/addtocart/${productId}`,
                        {
                            headers: { Authorization: `Bearer ${token}` },
                        }
                    );
                    if (response.data.success) {
                        alert(response.data.message);
                        setCartData((prevData) => prevData.filter(item => item.productId !== productId));
                    } else {
                        alert("Failed to remove item: " + response.data.message);
                    }
                } catch (error) {
                    console.error("Error in removing item from Add to Cart:", error);
                    alert("An error occurred while removing the item.");
                }
            } else {
                alert("No token found. Please log in again.");
            }
        } else {
            alert("Please Login First");
            window.location.href = "/login";
        }
    };

    return (
        <div className="cart-container0017">
            <NavLink to="/" className="close-icon0017">
                <span className="material-symbols-outlined">
                    close
                </span>
            </NavLink>
            {cartData.length ? (
                <>
                    <div className="cart-header0017">
                        <h1>Your Favorite Picks, Ready to Checkout!</h1>
                    </div>
                    <div className="cart-items0017">
                        {cartData.map((item, index) => (
                            <div key={index} className="cart-card0017">
                                <div className="cart-card-image0017">
                                    <img
                                        src={`http://localhost:3000/${item.productImage}`}
                                        alt={item.productName}
                                    />
                                </div>
                                <div className="cart-card-details0017">
                                    <h2>{item.productName}</h2>
                                    <p>{item.description}</p>
                                    <p>Price: ${item.productPrice}</p>
                                    <p>Quantity: {item.quantity}</p>
                                    <div className="button-row0017">
                                        <button onClick={() => HandleClick(item.productId)} className="remove-button0017">Remove</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            ) : (
                <h1>Nothing Here Yet! Start Shopping Now! 🛍️</h1>
            )}
        </div>
    );
};

export default AddtoCart;
