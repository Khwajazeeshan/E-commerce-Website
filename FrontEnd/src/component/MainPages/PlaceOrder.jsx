import React from 'react'
import { NavLink } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import '../../Styles/PlaceOrder.css'

const PlaceOrder = () => {
    const { ProductId } = useParams()
    const { register, handleSubmit, formState: { errors } } = useForm();

    const refreshToken = async () => {
        const oldToken = localStorage.getItem("token");
        if (!oldToken) {
            return false;    
        }
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
            window.location.href = "/";
            return false;
        }
    };

    const onSubmit = async (data) => {
        const refreshed = await refreshToken();
        if (refreshed) {
            const { name, address, postalCode, phoneNumber, email, quantity } = data;
            const orderDate = new Date().toISOString(); // Get the current date in ISO format
            const token = localStorage.getItem("token");
            if (token) {
                try {
                    const response = await axios.post(`http://localhost:3000/post/placeorder/${ProductId}`,
                        { name, address, postalCode, phoneNumber, email, quantity, orderDate }, // Include orderDate in the payload
                        { headers: { Authorization: `Bearer ${token}` } }
                    );
                    if (response.data.success) {
                        alert(response.data.message);
                        window.location.href = "/";
                    } else {
                        console.error("Error: ", response.data.message);
                    }
                } catch (error) {
                    if (error.response?.status === 401) {
                        console.log("Token expired, refreshing...");
                    } else {
                        console.error("Error in Place Order:", error);
                    }
                }
            } else {
                console.log("No Token", token);
            }
        }
        else {
            alert("Please Login First");
            window.location.href = "/login";
        }
    };

    return (
        <div className="order-page-container0016">
            <NavLink to="/" className="order-close-icon0016">
                <span className="material-symbols-outlined">close</span>
            </NavLink>
            <div className="order-card0016">
                <h1 className='order-h10016'>Place Order</h1>
                <form onSubmit={handleSubmit(onSubmit)} className="order-place-order-form0016">
                    <input type="text" placeholder='Enter Your Name' {...register('name', { required: true })} className="order-form-input0016" />
                    {errors.name && <span className="order-error-message0016">Name is required</span>}
                    <input type="text" placeholder='Enter Address' {...register('address', { required: true })} className="order-form-input0016" />
                    {errors.address && <span className="order-error-message0016">Address is required</span>}
                    <input type="number" placeholder='Enter Postal Code' {...register('postalCode', { required: true })} className="order-form-input0016" />
                    {errors.postalCode && <span className="order-error-message0016">Postal Code is required</span>}
                    <input type="phone" placeholder='Enter Phone Number' {...register('phoneNumber', { required: true })} className="order-form-input0016" />
                    {errors.phoneNumber && <span className="order-error-message0016">Phone Number is required</span>}
                    <input type="text" placeholder='Enter Email' {...register('email', { required: true })} className="order-form-input0016" />
                    {errors.email && <span className="order-error-message0016">Email is required</span>}
                    <label htmlFor="quantity" className="order-form-label0016">Select Quantity:</label>
                    <input type="number" id="quantity" name="quantity" min="1" max="100" step="1" {...register('quantity', { required: true })} className="order-form-input0016" />
                    {errors.quantity && <span className="order-error-message0016">Quantity is required</span>}
                    <label className="order-form-checkbox-label0016">
                        <input type="checkbox" {...register('cashOnDelivery', { required: true })} className="order-form-checkbox0016" />
                        Cash On Delivery
                    </label>
                    {errors.cashOnDelivery && <span className="order-error-message0016">This field is required</span>}
                    <button type="submit" className="order-submit-button0016">Place Order</button>
                </form>
            </div>
        </div>
    )
}

export default PlaceOrder
