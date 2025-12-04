import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { NavLink } from "react-router-dom";
import "../../Styles/StoreDetail.css";

const StoreDetail = () => {
    const [details, setDetails] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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

    useEffect(() => {
        const storeInfo = async () => {
            const token = localStorage.getItem("token");
            if (token) {
                try {
                    const response = await axios.get("http://localhost:3000/get/storedetail", {
                        headers: { Authorization: `Bearer ${token}` }
                    });
                    setDetails(response.data);
                    setError(null);
                } catch (error) {
                    if (error.response?.status === 401) {
                        const refreshed = await refreshToken();
                        if (refreshed) await storeInfo();
                    } else {
                        setError("Failed to fetch store details.");
                    }
                } finally {
                    setLoading(false);
                }
            } else {
                setLoading(false);
            }
        };
        storeInfo();
    }, []);

    return (
        <div className="store-detail-page006">
            <NavLink to="/store" className="close-icon006">
                <span className="material-symbols-outlined">close</span>
            </NavLink>
            <h1>Store Detail Page</h1>
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p className="error-message006">{error}</p>
            ) : details ? (
                <table className="store-detail-table006">
                    <tbody>
                        <tr>
                            <td>Store Name</td>
                            <td>{details.storeName}</td>
                        </tr>
                        <tr>
                            <td>Description</td>
                            <td>{details.description}</td>
                        </tr>
                        <tr>
                            <td>Address</td>
                            <td>{details.address}</td>
                        </tr>
                        <tr>
                            <td>Business Type</td>
                            <td>{details.businessType}</td>
                        </tr>
                    </tbody>
                </table>
            ) : (
                <p>No store details available.</p>
            )}
        </div>
    );
};

export default StoreDetail;
