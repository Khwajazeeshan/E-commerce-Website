import React from 'react'
import { useForm } from 'react-hook-form'
import { NavLink } from 'react-router-dom'
import axios from 'axios'
import '../../Styles/AddProducts.css'

const AddProducts = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();

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
            console.error("Token refresh failed:", error);
            localStorage.clear();
            return false;
        }
    };

    const onSubmit = async (data) => {
        const refreshed = await refreshToken();
        if (refreshed) {
            const { productName, description, productPrice, quantity, productImage } = data;
            const token = localStorage.getItem("token");
            if (token) {
                try {
                    const formData = new FormData();
                    formData.append('productName', productName);
                    formData.append('description', description);
                    formData.append('productPrice', productPrice);
                    formData.append('quantity', quantity);
                    formData.append('productImage', productImage[0]);
                    const response = await axios.post('http://localhost:3000/post/addproduct',
                        formData,
                        { headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' } }
                    );
                    if (response.data.success) {
                        alert(response.data.message);
                        window.location.href = "/store";
                    } else {
                        console.error("Error: ", response.data.message);
                    }
                } catch (error) {
                    if (error.response?.status === 401) {
                        console.log("Token expired, refreshing...");
                    } else {
                        console.error("Error submitting store form:", error);
                    }
                }
            } else {
                console.log("No Token", token);
            }
        }
    };

    return (
        <div style={{ backgroundColor: '#f9f9f9', minHeight: '100vh', display: "flex", justifyContent: "center", alignItems: "center" }}>
            <NavLink to="/store" className="close-icon005">
                <span className="material-symbols-outlined">
                    close
                </span>
            </NavLink>
            <form className="add-product-container005" onSubmit={handleSubmit(onSubmit)}>
                <h1>Add Product Details</h1>
                <input type="text" placeholder='Product Name' {...register('productName', { required: true })} />
                {errors.productName && <p className="error-message005">Product Name is required</p>}
                <input type="text" placeholder='Description' {...register('description', { required: true })} />
                {errors.description && <p className="error-message005">Description is required</p>}
                <input type="number" placeholder='Product Price' {...register('productPrice', { required: true })} />
                {errors.productPrice && <p className="error-message005">Product Price is required</p>}
                <input type="number" placeholder='Quantity' {...register('quantity', { required: true })} />
                {errors.quantity && <p className="error-message005">Quantity is required</p>}
                <input type="file" accept=".jpeg,.jpg,.png" {...register('productImage', { required: true })} />
                {errors.productImage && <p className="error-message005">Product Image is required</p>}
                <button type="submit">Add Product</button>
            </form>
        </div>
    )
}

export default AddProducts
