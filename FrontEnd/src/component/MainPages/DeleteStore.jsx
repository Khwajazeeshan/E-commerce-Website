import React from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import { useForm } from 'react-hook-form';
import axios from "axios";
import '../../Styles/DeleteStore.css';

const DeleteStore = () => {
    const { handleSubmit, register, formState: { errors, isSubmitting } } = useForm();
    const navigate = useNavigate();

    const deleteStore = async (data) => {
        const { password: DeletePassword } = data;
        const token = localStorage.getItem("token");
        try {
            const response = await axios.delete("http://localhost:3000/delete/deletestore", {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                data: { DeletePassword }
            });
            if (response.data.success) {
                alert(response.data.message);
                navigate('/');
            } else {
                alert(response.data.message || "Failed!!!");
                location.reload();
            }
        } catch (error) {
            alert(error.response?.data?.message || "An error occurred");
            location.reload();
        }
    };

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

    const onSubmit = async (data) => {
        if (window.confirm("Are you sure you want to delete this Store Permenantly?")) {
            const refreshed = await refreshToken();
            if (refreshed) {
                await deleteStore(data);
            }
        } else {
            alert("Store deletion cancelled.");
            window.location.reload();
        }
    }

    return (
        <div id="delete-store-page007">
            <div id="delete-store-container007">
                <NavLink to="/store" className="close-icon007" id="close-icon007">
                    <span className="material-symbols-outlined">close</span>
                </NavLink>
                <h1 id="delete-store-title007">Delete Store</h1>
                <form onSubmit={handleSubmit(onSubmit)} id="delete-store-form007">
                    <input
                        type="password"
                        placeholder="Enter Password"
                        {...register("password", { required: "Password is required", minLength: { value: 8, message: "Minimum length is 8 characters" } })}
                        id="delete-store-password007"
                    />
                    {errors.password && <p id="delete-store-error007">{errors.password.message}</p>}
                    <button type="submit" id="delete-store-button007">Delete Store</button>
                    <NavLink to="/forget"><button type='button' disabled={isSubmitting} id='forget007'>Forget Password</button></NavLink>
                </form>
            </div>
        </div>
    )
}

export default DeleteStore;
