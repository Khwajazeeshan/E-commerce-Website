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
        document.querySelector('.sidebar0013').style.transform = isSidebarOpen ? 'translateX(100%)' : 'translateX(0)';
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
        <div className="navbar0013">
            <div className="navbar-header0013">
                <h1>E-commerce</h1>
                <span className="material-symbols-outlined menu-icon0013" id='menu-icon' onClick={toggleSidebar}>
                    menu
                </span>
            </div>
            {isSidebarOpen && (
                <div className="sidebar0013">
                    <span className="material-symbols-outlined close-icon0013" onClick={toggleSidebar}>
                        close
                    </span>
                    <ul>
                        {isLoggedIn ? (
                            <>
                                <li><NavLink to="/profile" id='nav'>Profile</NavLink></li>
                                {check ? (
                                    <li><NavLink to="/store" id='nav'>My Store</NavLink></li>
                                ) : (
                                    <li><NavLink to="/createstore" id='nav'>Create Store</NavLink></li>
                                )}
                                <li><NavLink to="/myorder" id='nav'>My Order</NavLink></li>
                                <li><NavLink to="/addtocart" id='nav'>Add to Cart</NavLink></li>
                                <li><NavLink to="/contact" id='nav'>Contact us</NavLink></li>
                                <li><NavLink to="/about" id='nav'>About us</NavLink></li>
                            </>
                        ) : (
                            <>
                                <li><NavLink to="/Signup" id='nav'>Create Account</NavLink></li>
                                <li><NavLink to="/createstore" id='nav'>Create Store</NavLink></li>
                                <li><NavLink to="/myorder" id='nav'>My Order</NavLink></li>
                                <li><NavLink to="/addtocart" id='nav'>Add to Cart</NavLink></li>
                                <li><NavLink to="/contact" id='nav'>Contact us</NavLink></li>
                                <li><NavLink to="/about" id='nav'>About us</NavLink></li>
                            </>
                        )}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Navbar;