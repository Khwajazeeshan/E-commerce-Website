import { useEffect, useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import '../../Styles/CreateStore.css';
import axios from 'axios';

const CreateStore = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
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
            localStorage.clear();
            return false;
        }
    };

    const onSubmit = async (data) => {
        const refreshed = await refreshToken();
        if (refreshed) {
            const { storeName, description, address, businessType } = data;
            const token = localStorage.getItem("token");
            if (token) {
                try {
                    const response = await axios.post('http://localhost:3000/post/storeform',
                        { storeName, description, address, businessType },
                        { headers: { Authorization: `Bearer ${token}` } }
                    );
                    if (response.data.success) {
                        alert(response.data.message);
                        window.location.href = "/store";
                    }else if((response.data.false)){
                        alert(response.data.message);
                        window.location.href = "/";
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
            }
        }
    };

    useEffect(() => {
        if (!isLoggedIn) {
            const userConfirmed = window.confirm("Please Signup First...");
            if (userConfirmed) {
                navigate("/Signup");
            } else {
                navigate("/");
            }
        }
    }, [isLoggedIn, navigate]);

    return (
        <>
            <NavLink to="/" className="close-icon0021">
                <span className="material-symbols-outlined">close</span>
            </NavLink>
            <div className="create-store-container0021">
                <h2>Create Your Own Store</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="create-store-form0021">
                    <div className="form-group0021">
                        <label>Store Name:</label>
                        <input
                            type="text"
                            {...register('storeName', { required: true })}
                            className={errors.storeName ? 'input-error0021' : ''}
                        />
                        {errors.storeName && <p className="error-message0021">This field is required</p>}
                    </div>
                    <div className="form-group0021">
                        <label>Description:</label>
                        <textarea
                            {...register('description', { required: true })}
                            className={errors.description ? 'input-error0021' : ''}
                        />
                        {errors.description && <p className="error-message0021">This field is required</p>}
                    </div>
                    <div className="form-group0021">
                        <label>Enter Your Permanent Address:</label>
                        <input
                            type="text"
                            {...register('address', { required: true })}
                            className={errors.address ? 'input-error0021' : ''}
                        />
                        {errors.address && <p className="error-message0021">This field is required</p>}
                    </div>
                    <div className="form-group0021">
                        <label>Business Type:</label>
                        <select
                            {...register('businessType', { required: true })}
                            className={errors.businessType ? 'input-error0021' : ''}
                        >
                            <option value="Individual">Individual</option>
                            <option value="Company">Company</option>
                        </select>
                        {errors.businessType && <p className="error-message0021">This field is required</p>}
                    </div>
                    <button type="submit" className="submit-button0021">Create Store</button>
                </form>
            </div>
        </>
    );
};

export default CreateStore;
