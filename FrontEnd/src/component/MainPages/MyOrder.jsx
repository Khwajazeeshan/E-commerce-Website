import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import '../../Styles/MyOrder.css';

const MyOrder = () => {
    const [OrderData, MyOrderData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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

    useEffect(() => {
        const fetchMyOrderData = async () => {
            setLoading(true);
            setError(null);
            const refreshed = await refreshToken();
            if (refreshed) {
                const token = localStorage.getItem('token');
                if (!token) {
                    console.error('No JWT token found');
                    setError('Authentication error. Please log in again.');
                    setLoading(false);
                    return;
                }
                try {
                    const response = await axios.get('http://localhost:3000/get/MyOrder', {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    MyOrderData(response.data);
                } catch (error) {
                    console.error('Error fetching My Order data:', error.response || error.message); // Log error details
                    setError(error.response?.data?.message || 'Failed to fetch order data. Please try again later.');
                }
            } else {
                console.log('Token expired. Please log in again.');
            }
            setLoading(false);
        };
        fetchMyOrderData();
    }, []);

    return (
        <div className="my-order-container0018">
            <header className="my-order-header0018">
            <NavLink to="/" className="close-icon0017">
                <span className="material-symbols-outlined">
                    close
                </span>
            </NavLink>
                <h1>Welcome to Your Orders</h1>
                <p>Track and manage all your purchases in one place!</p>
            </header>
            {loading ? (
                <h1>Loading your orders...</h1>
            ) : error ? (
                <div className="error-message0018">
                    <h1>{error}</h1>
                </div>
            ) : OrderData.length ? (
                <div>
                    <ul className="order-list0018">
                        {OrderData.map((order, index) => (
                            <li key={index} className="order-item0018">
                                <img
                                    src={`http://localhost:3000/${order.productImage || 'defaultImage.jpg'}`}
                                    alt={order.productName || 'Product Image'}
                                    className="order-image0018"
                                />
                                <div className="order-details0018">
                                    <h2>{order.productName}</h2>
                                    <p>{order.description}</p>
                                    <p><strong>Price:</strong> ${order.productPrice}</p>
                                    <p><strong>Status:</strong> In Process</p>
                                    <p><strong>Order Date:</strong> {order.orderDate}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            ) : (
                <h1>No Orders Yet! Start Shopping Now! 🛍️</h1>
            )}
        </div>
    );
};

export default MyOrder;
