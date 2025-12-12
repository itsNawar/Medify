import React, { createContext, useState, useEffect, useMemo } from "react"; 
import axios from 'axios'; 
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const AppContext = createContext();

const AppContextProvider = (props) => {

  
    const currency = 'BDT'
    const calculateAge = (dob) => {
        const today = new Date()
        const birthdate = new Date(dob)
        
        let age = today.getFullYear() - birthdate.getFullYear()
        
        return age 
    }

    const months = ["","Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]

    const slotDateFormat = (slotDate) => {
        
        const dateArray = slotDate.split('_')
        return dateArray[0] + " " + months[Number(dateArray[1])] + " " + dateArray[2]
    }
    
    const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';
    
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [token, setToken] = useState(''); 

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

    
    useEffect(() => {
        getDoctorsData();
    }, []); 

    const value = useMemo(() => ({
        doctors,
        loading,
        error,
        token,
        setToken,
        backendUrl, 
        calculateAge,
        currency,
        slotDateFormat,
        getDoctorsData 
    }), [doctors, loading, error, token, backendUrl]); 
    
    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    );

}

export default AppContextProvider;