import React, { useContext, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

import { AppContext } from '../context/AppContext';
import { AdminContext } from '../context/AdminContext';
import { DoctorContext } from '../context/DoctorContext';

const Login = () => {
    const { backendUrl } = useContext(AppContext);
    const { setAToken } = useContext(AdminContext);
    const { setDToken } = useContext(DoctorContext);

    const [role, setRole] = useState('Admin');
    const [isSignup, setIsSignup] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const onSubmitHandler = async (e) => {
        e.preventDefault();

        const authData = { email, password };
        const authType = isSignup ? 'signup' : 'login';

        try {
            const rolePath = role === 'Admin' ? '/api/admin/' : '/api/doctor/';
            const endpoint = backendUrl + rolePath + authType;

            const { data } = await axios.post(endpoint, authData);

            if (data.success) {
                toast.success(isSignup ? 'Registration Successful!' : 'Login Successful!');

                if (role === 'Admin') {
                    localStorage.setItem('aToken', data.token);
                    setAToken(data.token);
                    navigate('/admin/dashboard');
                } else {
                    localStorage.setItem('dToken', data.token);
                    setDToken(data.token);
                    navigate('/doctor/dashboard');
                }
            } else {
                toast.error(data.message);
            }
        } catch (err) {
            toast.error('Network error. Please try again.');
            console.error(err);
        }
    };

    return (
        <form onSubmit={onSubmitHandler} className="min-h-screen flex justify-center items-center">
            <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-[#5E5E5E] text-sm shadow-lg">

                <p className="text-2xl font-semibold m-auto mb-4">
                    <span className="text-primary">{role}</span> {isSignup ? 'Sign Up' : 'Login'}
                </p>

                {/* Role Toggle */}
                <div className="flex w-full mb-3 justify-center text-sm font-semibold">
                    <button
                        type="button"
                        onClick={() => setRole('Admin')}
                        className={`py-1 px-4 rounded-l-md ${role === 'Admin' ? 'bg-primary text-white' : 'bg-gray-200 text-gray-700'}`}
                    >
                        Admin
                    </button>

                    <button
                        type="button"
                        onClick={() => setRole('Doctor')}
                        className={`py-1 px-4 rounded-r-md ${role === 'Doctor' ? 'bg-primary text-white' : 'bg-gray-200 text-gray-700'}`}
                    >
                        Doctor
                    </button>
                </div>

                {/* Email */}
                <div className="w-full">
                    <p>Email</p>
                    <input
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        type="email"
                        required
                        className="border border-[#DADADA] rounded w-full p-2 mt-1 focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                    />
                </div>

                {/* Password */}
                <div className="w-full">
                    <p>Password</p>
                    <input
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        type="password"
                        required
                        className="border border-[#DADADA] rounded w-full p-2 mt-1 focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                    />
                </div>

                {/* Submit */}
                <button className="bg-primary text-white w-full py-2 rounded-md text-base hover:bg-opacity-90 transition duration-150 shadow-md mt-2">
                    {isSignup ? 'Sign Up' : 'Login'}
                </button>

                {/* Mode Toggle */}
                {isSignup ? (
                    <p>
                        Already have an account?
                        <span
                            onClick={() => setIsSignup(false)}
                            className="text-primary underline cursor-pointer font-semibold ml-1"
                        >
                            Login here
                        </span>
                    </p>
                ) : (
                    <p>
                        Need a {role} account?
                        <span
                            onClick={() => setIsSignup(true)}
                            className="text-primary underline cursor-pointer font-semibold ml-1"
                        >
                            Sign Up
                        </span>
                    </p>
                )}
            </div>
        </form>
    );
};

export default Login;