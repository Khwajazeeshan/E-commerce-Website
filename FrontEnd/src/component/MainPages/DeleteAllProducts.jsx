import React from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import { useForm } from 'react-hook-form';
import axios from "axios";
import '../../Styles/DeleteAllProducts.css';

const DeleteAllProducts = () => {
    const { handleSubmit, register, formState: { errors, isSubmitting } } = useForm();
    const navigate = useNavigate();

    const HandleDelete = async (data) => {
        const token = localStorage.getItem("token");
        const password = data.password;
        try {
            const response = await axios.delete('http://localhost:3000/delete/deleteallproducts', {
                headers: { Authorization: `Bearer ${token}` },
                data: { Password: password }
            });
            alert(response.data.message);
        } catch (error) {
            alert(error.response?.data?.message || "Something went wrong!");
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
        if (window.confirm("Are you sure you want to delete All Products!")) {
            const refreshed = await refreshToken();
            if (refreshed) {
                await HandleDelete(data);
            }
        } else {
            alert("All Products deletion cancelled.");
        }
    };

    return (
        <div id="delete-all-products-page008">
            <div id="delete-all-products-container008">
                <NavLink to="/store" className="close-icon008" id="close-icon008">
                    <span className="material-symbols-outlined">close</span>
                </NavLink>
                <h1 id="delete-all-products-title008">Delete All Products</h1>
                <form onSubmit={handleSubmit(onSubmit)} id="delete-all-products-form008">
                    <input
                        type="password"
                        placeholder="Enter Password"
                        {...register("password", { required: "Password is required", minLength: { value: 8, message: "Minimum length is 8 characters" } })}
                        id="delete-all-products-password008"
                    />
                    {errors.password && <p id="delete-all-products-error008">{errors.password.message}</p>}
                    <button id="delete-all-products-button008">Delete All Products</button>
                    <NavLink to="/forget"><button type='button' disabled={isSubmitting} id='forget008'>Forget Password</button></NavLink>
                </form>
            </div>
        </div>
    );
};

export default DeleteAllProducts;
