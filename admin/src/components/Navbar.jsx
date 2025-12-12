import React, { useContext } from 'react';
import { assets } from '../assets/assets';
import { AdminContext } from '../context/AdminContext';
import { DoctorContext } from '../context/DoctorContext'; 
import { useNavigate } from 'react-router-dom';

const Navbar = () => {

    const { aToken, setAToken } = useContext(AdminContext);
    const { dToken, setDToken } = useContext(DoctorContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        navigate('/');
        if (aToken) {
            localStorage.removeItem('aToken');
            setAToken('');
        }
        if (dToken) {
            localStorage.removeItem('dToken'); 
            setDToken('');
        }
    };

    const getRole = () => {
        if (aToken) {
            return 'Admin';
        }
        if (dToken) {
            return 'Doctor';
        }
        return 'Guest'; 
    };

    return (
        <div className="flex justify-between items-center bg-white px-8 py-3 shadow-md w-full">
            <div className="flex items-center gap-4">
                <div className="flex flex-col cursor-pointer" onClick={() => navigate('/')}>
                    <h1 className="text-2xl font-extrabold text-blue-800 tracking-tight">
                        MEDIFY
                    </h1>
                    <p className="text-xs text-gray-500 -mt-1">
                        Dashboard Panel
                    </p>
                </div>
                <p className="border px-2.5 py-0.5 rounded-full border-gray-500 text-gray-600 text-sm">
                    {getRole()}
                </p>
            </div>
            
            {(aToken || dToken) && (
                <button
                    onClick={handleLogout}
                    className="bg-blue-600 hover:bg-blue-700 transition-colors text-white text-sm px-10 py-2 rounded-full"
                >
                    Logout
                </button>
            )}
        </div>
    );
};

export default Navbar;