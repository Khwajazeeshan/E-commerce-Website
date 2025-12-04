import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import "../../Styles/StoreNavbar.css"; // Import the CSS file

const StoreNavbar = () => {
    const [store, setStore] = useState({});
    const navigate = useNavigate();

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
            localStorage.removeItem("token");
            navigate("/login"); // Redirect to login page if token refresh fails
            return false;
        }
    };

    useEffect(() => {
        const storeInfo = async () => {
            const refreshed = await refreshToken();
            if (refreshed) {
                const token = localStorage.getItem("token");
                try {
                    const response = await axios.get("http://localhost:3000/get/storeinfo", {
                        headers: { Authorization: `Bearer ${token}` }
                    });
                    setStore(response.data);
                } catch (error) {
                    alert("Error in fetching store info:", error);
                }
            } else {
                console.log("No Token available");
            }
        };
        storeInfo();
    }, []);

    const openSidebar = () => {
        const sidebar = document.getElementById("mySidebar");
        sidebar.classList.add("open");
        sidebar.style.width = ""; // Remove inline style width
    };

    const closeSidebar = () => {
        const sidebar = document.getElementById("mySidebar");
        sidebar.classList.remove("open");
        sidebar.style.width = "0"; // Ensure width is set to 0 when closing
    };

    return (
        <div className="navbar-container-new004">
            <div className="store-name-new004">
                {store.storeName && <h1>{store.storeName}</h1>}
            </div>
            <div className="menu-close-container1004">
                <button className="menu-button-new004" onClick={openSidebar}>
                    ☰
                </button>
                <NavLink to="/" className="close-icon1004">
                    <span className="material-symbols-outlined">
                        close
                    </span>
                </NavLink>
            </div>
            <div id="mySidebar" className="sidebar-new004">
                <a href="javascript:void(0)" className="closebtn" onClick={closeSidebar}>&times;</a>
                <NavLink to="/addproduct" className="navbar-button-new004">Add Product</NavLink>
                <NavLink to="/storedetail" className="navbar-button-new004">Store Details</NavLink>
                <NavLink to="/deleteallproducts" className="navbar-button-new004">Delete All Products</NavLink>
                <NavLink to="/deletestore" className="navbar-button-new004">Delete Store</NavLink>
            </div>
        </div>
    );
};

export default StoreNavbar;
