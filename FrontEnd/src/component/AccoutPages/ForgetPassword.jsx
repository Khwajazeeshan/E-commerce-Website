import React from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { NavLink } from 'react-router-dom'
import '../../styles/ForgetPassword.css'

const ForgetPassword = () => {
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();

    const onSubmit = async (data) => {
        const { email, password } = data;
        try {
            const response = await axios.put("http://localhost:3000/put/forget", { email, password });
            if (response.data.success) {
                alert(response.data.message);
                window.location.href = "/deleteAccount";  // Redirect only if login is successful
            }
            else {
                alert(response.data.message)
                location.reload()
            }
        }
        catch (error) {
            alert(error.response?.data?.message || "Something went wrong!");  // ✅ ERROR MESSAGE FROM BACKEND
        }
    }
    return (
        <div className="forget-password-page003">
            <div className="forget-password-container003">
                <h1 className='forget-password-title003'>Forget Password</h1>
                <form onSubmit={handleSubmit(onSubmit)} className="forget-password-form003">
                    <input type="email" placeholder='Enter Email'
                        {...register("email", { required: { value: true, message: "Please Enter Email" } })} 
                        className="forget-password-input003"
                    />
                    {errors.email && <p className="error-message003">{errors.email.message}</p>}
                    <input type="password" placeholder='Enter New Password'
                        {...register("password", { required: { value: true, message: "Please Enter New Password" }, minLength: { value: 8, message: "Min-Length is 8" } })} 
                        className="forget-password-input003"
                    />
                    {errors.password && <p className="error-message003">{errors.password.message}</p>}
                    <button disabled={isSubmitting} type='submit' className="forget-password-button003">Change Password</button>
                </form>
                <NavLink to="/" className="back-link003"><button className='Back-button003'>Back</button></NavLink>
            </div>
        </div>
    )
}

export default ForgetPassword
