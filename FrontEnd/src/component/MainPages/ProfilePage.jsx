import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import "../../Styles/ProfilePage.css";

const ProfilePage = () => {
    const navigate = useNavigate();

    const [profile, setProfile] = useState();

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
        const UserInfo = async () => {
            const token = localStorage.getItem("token");
            if (token) {
                try {
                    const response = await axios.get("http://localhost:3000/get/UserInfo", {
                        headers: { Authorization: `Bearer ${token}` }
                    });
                    setProfile(response.data);
                } catch (error) {
                    if (error.response?.status === 401) {
                        const refreshed = await refreshToken();
                        if (refreshed) await UserInfo();
                    }
                }
            } else {
                return;
            }
        };
        UserInfo();
    }, []);

    const handleLogout = () => {
        if (window.confirm("Log out this page!")) {
            localStorage.clear();
            window.dispatchEvent(new Event("storage"));
            navigate("/");
        }
    };

    return (
        <div className="profile-page1001">
            <h1>Welcome to your profile</h1>
            <NavLink to="/" className="close-icon001">
                <span className="material-symbols-outlined">
                    close
                </span>
            </NavLink>
            <table className="profile-table001">
                <tbody>
                    {profile && (
                        <>
                            <tr>
                                <td>Name</td>
                                <td>{profile.first}</td>
                            </tr>
                            <tr>
                                <td>Email</td>
                                <td>{profile.email}</td>
                            </tr>
                            <tr>
                                <td>Phone</td>
                                <td>{profile.phone}</td>
                            </tr>
                        </>
                    )}
                </tbody>
            </table>
            <div className="button-group11001">
                <button onClick={handleLogout} className="logout-button001">Log out</button>
                <NavLink to="/deleteAccount" type="submit" className="delete-button001">Delete Account</NavLink>
            </div>
        </div>
    );
};

export default ProfilePage;
