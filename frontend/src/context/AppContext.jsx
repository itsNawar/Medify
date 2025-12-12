import { createContext, useEffect, useState, useMemo } from "react";
import { doctors } from "../assets/assets";
import axios from 'axios';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const AppContext = createContext();

const AppContextProvider = (props) => {

    const currencySymbol = 'BDT'
    const calculateAge = (dob) => {
        const today = new Date()
        const birthdate = new Date(dob)

        let age = today.getFullYear() - birthdate.getFullYear()
        return age
    }

    const months = ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

    const slotDateFormat = (slotDate) => {

        const dateArray = slotDate.split('_')
        return dateArray[0] + " " + months[Number(dateArray[1])] + " " + dateArray[2]
    }

    const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : false)
    const [userData, setUserData] = useState(false)

    const getDoctorsData = async () => {
        try {
            setLoading(true); 
            setError(null);

            if (!backendUrl) {
                console.error("Configuration Error: Backend URL missing.");
                setError("Configuration Error: Backend URL missing.");
                setLoading(false);
                return;
            }

            const { data } = await axios.get(backendUrl + '/api/doctor/list');

            if (data.success) {
                setDoctors(data.doctors);
            } else {
                setError(data.message || 'Failed to fetch doctor list.');
            }

        } catch (err) {
            console.error("Error fetching doctors:", err);
            toast.error('Network error: Could not connect to backend.');
            setError('Network error while fetching doctors.');
        } finally {
            setLoading(false);
        }
    }

    const loadUserProfileData = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/user/get-profile', { headers: { token } })
            if (data.success) {
                setUserData(data.userdata)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    useEffect(() => {
        getDoctorsData();
    }, []);

    useEffect(() => {
        if (token) {
            loadUserProfileData()
        } else {
            setUserData(false)
        }
    }, [token])

    const value = useMemo(() => ({
        doctors,getDoctorsData,
        currencySymbol,
        loading,
        error,
        token,
        setToken,
        backendUrl,
        userData,
        setUserData,
        loadUserProfileData,
        calculateAge,
        slotDateFormat,
    }), [doctors, loading, error, token, backendUrl, userData]);


    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider