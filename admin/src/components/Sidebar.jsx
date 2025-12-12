import React, { useContext } from 'react';
import { assets } from '../assets/assets';
import { AdminContext } from '../context/AdminContext';
import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { DoctorContext } from '../context/DoctorContext';

const Sidebar = () => {

    const {aToken} = useContext(AdminContext)
    const {dToken} = useContext(DoctorContext)

    const linkClasses = 'flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer';
    const activeClasses = 'bg-[#F2F3FF] border-r-4 border-primary';

    return (
        <div className='min-h-screen bg-white border-r'>
            {
                aToken && <ul className='text-[#515151] mt-5'>

                    
                    <NavLink 
                        to={'/admin-dashboard'}
                        className={({isActive}) => 
                            `${linkClasses} ${isActive ? activeClasses : ''}`
                        }
                    >
                        <img src={assets.home_icon} alt="Home Icon" />
                        <p className='hidden md:block'>Dashboard</p>
                    </NavLink>


                    <NavLink 
                        to={'/all-appointments'}
                        className={({isActive}) => 
                            `${linkClasses} ${isActive ? activeClasses : ''}`
                        }
                    >
                        <img src={assets.appointment_icon} alt="Appointment Icon" />
                        <p className='hidden md:block'>Appointments</p>
                    </NavLink>

            
                    <NavLink 
                        to={'/add-doctor'}
                        className={({isActive}) => 
                            `${linkClasses} ${isActive ? activeClasses : ''}`
                        }
                    >
                        <img src={assets.add_icon} alt="Add Icon" />
                        <p className='hidden md:block'>Add Doctor</p>
                    </NavLink>

                  
                    <NavLink 
                        to={'/doctor-list'}
                        className={({isActive}) => 
                            `${linkClasses} ${isActive ? activeClasses : ''}`
                        }
                    >
                        <img src={assets.people_icon} alt="People Icon" />
                        <p className='hidden md:block'>Doctors List</p>
                    </NavLink>
                </ul>
            }

            {
                dToken && <ul className='text-[#515151] mt-5'>

                    
                    <NavLink 
                        to={'/doctor-dashboard'}
                        className={({isActive}) => 
                            `${linkClasses} ${isActive ? activeClasses : ''}`
                        }
                    >
                        <img src={assets.home_icon} alt="Home Icon" />
                        <p className='hidden md:block'>Dashboard</p>
                    </NavLink>


                    <NavLink 
                        to={'/doctor-appointments'}
                        className={({isActive}) => 
                            `${linkClasses} ${isActive ? activeClasses : ''}`
                        }
                    >
                        <img src={assets.appointment_icon} alt="Appointment Icon" />
                        <p className='hidden md:block'>Appointments</p>
                    </NavLink>


                  
                    <NavLink 
                        to={'/doctor-profile'}
                        className={({isActive}) => 
                            `${linkClasses} ${isActive ? activeClasses : ''}`
                        }
                    >
                        <img src={assets.people_icon} alt="People Icon" />
                        <p className='hidden md:block'>Profile</p>
                    </NavLink>
                </ul>
            }
            
        </div>
    )
}

export default Sidebar