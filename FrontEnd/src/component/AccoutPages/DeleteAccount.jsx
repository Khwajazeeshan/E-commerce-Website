import React from 'react';
import { useForm } from 'react-hook-form';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../Styles/DeleteAccount.css';

const DeleteAccount = () => {
    const { handleSubmit, register, formState: { errors, isSubmitting } } = useForm();
    const navigate = useNavigate();

    const deleteAccount = async (data) => {
        const { password: DeletePassword } = data;
        const token = localStorage.getItem("token");
        if (!token) {
            alert("Session expired. Please log in again.");
            navigate('/login');
            return;
        }
        try {
            const response = await axios.delete("http://localhost:3000/delete/deleteAccount", {
                headers: { Authorization: `Bearer ${token}` },
                data: { DeletePassword }
            });
            alert(response.data.message);
            localStorage.clear();
            window.dispatchEvent(new Event("storage"));
            navigate('/');
        } catch (error) {
            alert(error.response?.data?.message);
            location.reload()
        }
    };

    const refreshToken = async () => {
        const oldToken = localStorage.getItem("token");
        if (!oldToken) return false;
        try {
            const response = await axios.get("http://localhost:3000/get/refreshToken", {
                headers: { Authorization: `Bearer ${oldToken}` }
            });
            if (!response.data.newToken) {
                return false;
            }
            localStorage.setItem("token", response.data.newToken);
            return true;
        } catch (error) {
            localStorage.clear();
            return false;
        }
    };

    const onSubmit = async (data) => {
        const token = localStorage.getItem("token");
        if (!token) {
            alert("No token found. Please log in again.");
            navigate('/login');
            return;
        }
        if (window.confirm("Are you sure you want to delete this account?")) {
            const tokenRefreshed = await refreshToken();
            if (!tokenRefreshed) {
                alert("Session expired. Please log in again.");
                navigate('/login');
                return;
            }
            await deleteAccount(data);
        } else {
            window.location.reload();
        }
    };

    return (
        <div id="delete-account-page002">
            <NavLink to="/profile" id="close-icon002">
                <span className="material-symbols-outlined">close</span>
            </NavLink>
            <div id="delete-account-container002">
                <h1 id='delete-account-title002'>Delete Account</h1>
                <form onSubmit={handleSubmit(onSubmit)} id="delete-account-form002">
                    <input
                        type="password"
                        placeholder="Enter Password"
                        {...register("password", { required: "Password is required", minLength: { value: 8, message: "Minimum length is 8 characters" } })}
                        id="delete-account-password002"
                    />
                    {errors.password && <span className="error-message">{errors.password.message}</span>}
                    <button type="submit" id="delete-account-button002">Delete Account</button>
                    <NavLink to="/forget"><button disabled={isSubmitting} type='submit' className='forget-password-button002'>Forget Password</button></NavLink>
                </form>
            </div>
        </div>
    );
};

export default DeleteAccount;
