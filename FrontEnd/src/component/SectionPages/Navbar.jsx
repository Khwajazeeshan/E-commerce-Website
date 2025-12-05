import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import '../../Styles/Navbar.css';

const Navbar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
    const [check, setCheck] = useState();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const refreshToken = async () => {
        const oldToken = localStorage.getItem("token");
        localStorage.removeItem("token");
        try {
            const response = await axios.get("http://localhost:3000/get/refreshToken", {
                headers: { Authorization: `Bearer ${oldToken}` }
            });
            const newToken = response.data.newToken;
            localStorage.setItem("token", newToken);
            window.dispatchEvent(new Event("storage"));
            return newToken;
        } catch (error) {
            if (error.response?.status === 401) {
                console.error("Token refresh failed: Unauthorized");
            } else {
                console.error("Token refresh failed from server side:", error);
            }
            localStorage.clear();
            return null;
        }
    };

    const checkToken = async () => {
        let token = localStorage.getItem("token");
        if (token) {
            try {
                await axios.get("http://localhost:3000/get/verifyToken", {
                    headers: { Authorization: `Bearer ${token}` }
                });
                return true;
            } catch (error) {
                if (error.response?.status === 401) {
                    console.warn("Token expired, attempting to refresh...");
                    token = await refreshToken();
                    if (token) {
                        try {
                            await axios.get("http://localhost:3000/get/verifyToken", {
                                headers: { Authorization: `Bearer ${token}` }
                            });
                            return true;
                        } catch (retryError) {
                            console.error("Retry after token refresh failed:", retryError);
                        }
                    }
                } else {
                    console.error("Token verification failed:", error);
                }
            }
        }
        return false;
    };

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    useEffect(() => {
        const initialize = async () => {
            const token = localStorage.getItem("token");
            if (token) {
                const tokenValid = await checkToken();
                if (tokenValid) {
                    const token = localStorage.getItem("token");
                    try {
                        const response = await axios.get("http://localhost:3000/get/checkstore", {
                            headers: { Authorization: `Bearer ${token}` }
                        });
                        if (response.data.success) {
                            setCheck(true);
                        } else {
                            setCheck(false);
                        }
                    } catch (error) {
                        console.error("Check store failed from server side:", error);
                    }
                }
            }
            else {
                console.log("No Token")
            }
        };
        initialize();
    }, [isLoggedIn]);

    useEffect(() => {
        const handleStorageChange = () => {
            setIsLoggedIn(!!localStorage.getItem("token"));
        };
        window.addEventListener("storage", handleStorageChange);
        return () => window.removeEventListener("storage", handleStorageChange);
    }, []);

    return (
        <>
            <div className="navbar0013">
                <div className="navbar-header0013">
                    <h1>ShopHub</h1>
                    <span className="material-symbols-outlined menu-icon0013" id='menu-icon' onClick={toggleSidebar}>
                        menu
                    </span>
                </div>
            </div>

            {/* Sidebar Backdrop */}
            {isSidebarOpen && (
                <div className={`sidebar-backdrop ${isSidebarOpen ? 'active' : ''}`} onClick={toggleSidebar}></div>
            )}

            {/* Sidebar */}
            <div className={`sidebar0013 ${isSidebarOpen ? 'active' : ''}`}>
                <span className="material-symbols-outlined close-icon0013" onClick={toggleSidebar}>
                    close
                </span>
                <ul>
                    {isLoggedIn ? (
                        <>
                            <li><NavLink to="/profile" onClick={toggleSidebar}>Profile</NavLink></li>
                            {check ? (
                                <li><NavLink to="/store" onClick={toggleSidebar}>My Store</NavLink></li>
                            ) : (
                                <li><NavLink to="/createstore" onClick={toggleSidebar}>Create Store</NavLink></li>
                            )}
                            <li><NavLink to="/myorder" onClick={toggleSidebar}>My Order</NavLink></li>
                            <li><NavLink to="/addtocart" onClick={toggleSidebar}>Add to Cart</NavLink></li>
                            <li><NavLink to="/contact" onClick={toggleSidebar}>Contact us</NavLink></li>
                            <li><NavLink to="/about" onClick={toggleSidebar}>About us</NavLink></li>
                        </>
                    ) : (
                        <>
                            <li><NavLink to="/Signup" onClick={toggleSidebar}>Create Account</NavLink></li>
                            <li><NavLink to="/createstore" onClick={toggleSidebar}>Create Store</NavLink></li>
                            <li><NavLink to="/myorder" onClick={toggleSidebar}>My Order</NavLink></li>
                            <li><NavLink to="/addtocart" onClick={toggleSidebar}>Add to Cart</NavLink></li>
                            <li><NavLink to="/contact" onClick={toggleSidebar}>Contact us</NavLink></li>
                            <li><NavLink to="/about" onClick={toggleSidebar}>About us</NavLink></li>
                        </>
                    )}
                </ul>
            </div>
        </>
    );
};

export default Navbar;