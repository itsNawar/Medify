import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from 'react-toastify';

export const AdminContext = createContext();

const AdminContextProvider = (props) => {

    const [aToken, setAToken] = useState(localStorage.getItem('aToken') || '');
    const [dToken, setDToken] = useState(localStorage.getItem('dToken') || '');
    const [doctors, setDoctors] = useState([]);
    const [appointments, setAppointments] = useState([]);
    const [dashData, setDashData] = useState(false)

    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const getAllDoctors = async () => {
        try {
            const { data } = await axios.post(
                backendUrl + '/api/admin/all-doctors',
                {},
                { headers: { atoken: aToken } }
            );
            if (data.success) {
                setDoctors(data.doctors);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    const changeAvailability = async (docId) => {
        try {
            const { data } = await axios.post(
                backendUrl + '/api/admin/change-availability',
                { docId },
                { headers: { atoken: aToken } }
            );

            if (data.success) {
                toast.success(data.message);
                getAllDoctors(); 
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message || 'Error changing availability.');
        }
    };

    const getAllAppointments = async () => {
        try { 
            const { data } = await axios.get(
                backendUrl + '/api/admin/appointments',
                { headers: { atoken: aToken } }
            );

            if (data.success) {
                setAppointments(data.appointments);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message || 'Error fetching appointments.');
        }
    };

    useEffect(() => {
        if (aToken) {
            localStorage.setItem('aToken', aToken);
        } else {
            localStorage.removeItem('aToken');
        }
    }, [aToken]);

    useEffect(() => {
        if (dToken) {
            localStorage.setItem('dToken', dToken);
        } else {
            localStorage.removeItem('dToken');
        }
    }, [dToken]);

    const cancelAppointment = async (appointmentId) => {
        try {
            const { data } = await axios.post(
                backendUrl + '/api/admin/cancel-appointment',
                { appointmentId },
                { headers: { atoken: aToken } }
            );

            if (data.success) {
                toast.success(data.message)
                getAllAppointments()
            } else {
                toast.error(data.message)
            }


        } catch (error) {
            toast.error(error.message)
        }
    }

    const getDashData = async () => {
        try {
            const { data } = await axios.get(
                backendUrl + '/api/admin/dashboard',
                { headers: { atoken: aToken } } 
            );

            if (data.success) {
                setDashData(data.dashData)
                console.log(data.dashData)
            } else {
                toast.error(data.success)
            }


        } catch (error) {
            toast.error(error.message)
        }
    }
    const value = {
        aToken,
        setAToken,
        dToken,
        setDToken,
        backendUrl,
        doctors,
        getAllDoctors,
        changeAvailability,
        appointments,
        setAppointments,
        cancelAppointment,
        dashData, getDashData,
        getAllAppointments
    };

    return (
        <AdminContext.Provider value={value}>
            {props.children}
        </AdminContext.Provider>
    );
}

export default AdminContextProvider;