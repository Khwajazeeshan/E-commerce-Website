import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../Styles/ProductCard.css';

const ProductCard = () => {
    const [products, setProducts] = useState([]);
    const [token, setToken] = useState(localStorage.getItem("token"));

    useEffect(() => {
        const handleStorageChange = () => {
            setToken(localStorage.getItem("token"));
        };
        window.addEventListener("storage", handleStorageChange);
        return () => {
            window.removeEventListener("storage", handleStorageChange);
        };
    }, []);

    useEffect(() => {
        const fetchProducts = async () => {
            if (!token) {
                return;
            }
            try {
                const response = await axios.get("http://localhost:3000/get/productdetail", {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setProducts(response.data);
            } catch (error) {
                console.error("Error in fetching product info:", error);
            }
        };
        fetchProducts();
    }, [token]);

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
            console.error("Token refresh failed from server side:", error);
            localStorage.clear();
            return false;
        }
    };

    const HandleDelete = async (id) => {
        const confirm = window.confirm("Are you sure you want to delete this product!");
        if (confirm) {
            const password = prompt("Enter Password");
            const refreshed = await refreshToken();
            if (refreshed) {
                const token = localStorage.getItem('token');
                try {
                    const response = await axios.delete(`http://localhost:3000/delete/deleteproduct/${id}`, {
                        headers: { Authorization: `Bearer ${token}` },
                        data: { Password: password }
                    });
                    if (response.data.success) {
                        alert(response.data.message);
                        setProducts(products.filter(product => product._id !== id));
                    } else {
                        alert(response.data.message);
                    }
                } catch (error) {
                    alert(error.response?.data?.message || "Something went wrong!");
                }
            } else {
                alert("Refresh Token failed...");
            }
        }
    };

    return (
        <div className="product-card-container0011">
            {
                products.length > 0 ? (
                    products.map((item, index) => (
                        <div key={index} className="product-card0011">
                            <img src={`http://localhost:3000/${item.productImage}`} alt={item.productName} className="product-image small-image0011" />
                            <div className="product-table-container0011">
                                <table className="product-table0011">
                                    <tbody>
                                        <tr>
                                            <td className="product-label0011">#No:</td>
                                            <td className="product-value0011">{index + 1}</td>
                                        </tr>
                                        <tr>
                                            <td className="product-label0011">Name:</td>
                                            <td className="product-value0011">{item.productName}</td>
                                        </tr>
                                        <tr>
                                            <td className="product-label0011">Description:</td>
                                            <td className="product-value0011">{item.description}</td>
                                        </tr>
                                        <tr>
                                            <td className="product-label0011">Price:</td>
                                            <td className="product-value0011">{item.productPrice}</td>
                                        </tr>
                                        <tr>
                                            <td className="product-label0011">Quantity:</td>
                                            <td className="product-value0011">{item.quantity}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="delete-button-container0011">
                                <button className="delete-button0011" onClick={() => HandleDelete(item._id)}>Delete Product</button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="NoProducts0011">No products available ❌</p>
                )
            }
        </div>
    );
};

export default ProductCard;
