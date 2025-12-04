import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import '../../styles/Login.css';

const Login = () => {
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();

    const onSubmit = async (data) => {
        const { email, paswrd } = data;
        try {
            const response = await axios.post("http://localhost:3000/post/login", { email, paswrd });
            if (response.data.success) {
                localStorage.setItem("token", response.data.token);
                alert(response.data.message);
                window.location.href = "/";
            } else {
                alert(response.data.message);
                location.reload();
            }
        } catch (error) {
            alert(error.response?.data?.message || "Something went wrong!");
        }
    };

    return (
        <div className="login-container0019">
            <NavLink to="/" className="close-icon0019">
                <span className="material-symbols-outlined">close</span>
            </NavLink>
            <div className="login-card0019">
                <h1 className="login-header0019">Login Page</h1>
                <form onSubmit={handleSubmit(onSubmit)} className="login-form0019">
                    <input type="email" placeholder='Enter Email' className="login-input0019"
                        {...register("email", { required: "Email is required" })} />
                    {errors.email && <p>{errors.email.message}</p>}
                    <input type="password" placeholder='Enter Password' className="login-input0019"
                        {...register("paswrd", { required: "Password is required", minLength: { value: 8, message: "Min-Length is 8" } })} />
                    {errors.paswrd && <p>{errors.paswrd.message}</p>}
                    <button disabled={isSubmitting} type="submit" className="login-button0019">Log in</button>
                    <button className="login-button0019" > <NavLink to="/signup">Sign up</NavLink></button>
                    <button className="login-button0019" id='forget0019'> <NavLink to="/forget">Forget Password</NavLink></button>
                </form>
            </div>
        </div>
    );
}

export default Login;
