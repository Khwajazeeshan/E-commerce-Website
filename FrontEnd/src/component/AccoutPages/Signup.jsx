import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import '../../styles/Signup.css';

const Signup = () => {
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();

    const onSubmit = async (data) => {
        const { first, email, phone, paswrd, conPaswrd } = data;

        if (paswrd !== conPaswrd) {
            alert("Password and Confirm Password should be the same");
            return;
        }
        try {
            const response = await axios.post("http://localhost:3000/post/add", { first, email, phone, paswrd, conPaswrd });
            if (response.data.success) {
                localStorage.setItem("token", response.data.token);
                alert(response.data.message);
                window.location.href = "/";
            } else {
                alert(response.data.message);
            }
        } catch (error) {
            alert(error.response?.data?.message || "Something went wrong!");
        }
    };

    return (
        <div className="signup-container0020">
            <NavLink to="/" className="close-icon0020">
                <span className="material-symbols-outlined">close</span>
            </NavLink>
            <div className="signup-card0020">
                <h1 className="signup-header0020">Sign-up Page</h1>
                <form className="signup-form0020" onSubmit={handleSubmit(onSubmit)}>
                    <input type="text" placeholder='Enter Name' className="signup-input0020"
                        {...register("first", { required: "Name is required", minLength: { value: 5, message: "Min-Length is 5" } })} />
                    {errors.first && <p>{errors.first.message}</p>}
                    <input type="email" placeholder='Enter Email' className="signup-input0020"
                        {...register("email", { required: "Email is required" })} />
                    {errors.email && <p>{errors.email.message}</p>}
                    <input type="number" placeholder='Enter Mobile Number' className="signup-input0020"
                        {...register("phone", { required: "Number is required", minLength: { value: 11, message: "Min-Length is 11" } })} />
                    {errors.phone && <p>{errors.phone.message}</p>}
                    <input type="password" placeholder='Enter Password' className="signup-input0020"
                        {...register("paswrd", { required: "Password is required", minLength: { value: 8, message: "Min-Length is 8" } })} />
                    {errors.paswrd && <p>{errors.paswrd.message}</p>}
                    <input type="password" placeholder='Confirm Password' className="signup-input0020"
                        {...register("conPaswrd", { required: "Confirm Password is required", minLength: { value: 8, message: "Min-Length is 8" } })} />
                    {errors.conPaswrd && <p>{errors.conPaswrd.message}</p>}
                    <button disabled={isSubmitting} className="signup-button0020" type="submit">Sign up</button>
                </form>
                <button className="signup-button0020"> <NavLink to="/login">Log In</NavLink></button>
            </div>
        </div>
    );
}

export default Signup;
