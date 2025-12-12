import React, { useContext, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import dropdown_icon from '../assets/dropdown_icon.svg';
import { assets } from '../assets/assets';
import { AppContext } from '../context/AppContext';

const Navbar = () => {
  const navigate = useNavigate();
  const { token, setToken, userData, setUserData } = useContext(AppContext) 
  const [showMenu, setShowMenu] = useState(false)

  const logout = () => {
    setToken(false)
    localStorage.removeItem('token')
    if (setUserData) setUserData(false) 
    navigate('/login') 
  }

  return (
    <div className="flex items-center justify-between text-sm py-4 px-8 mb-5 border-b border-gray-400">

      {/* LOGO */}
      <div className="flex flex-col cursor-pointer" onClick={() => navigate('/')}>
        <h1 className="text-2xl font-extrabold text-blue-800 tracking-tight">MEDIFY</h1>
      </div>

      {/* NAV MENU */}
      <ul className="hidden md:flex items-center gap-6 font-medium">
        <li>
          <NavLink
            to="/"
            className={({ isActive }) => isActive ? "border-b-2 border-blue-800 pb-1" : "pb-1"}
          >HOME</NavLink>
        </li>
        <li>
          <NavLink
            to="/doctors"
            className={({ isActive }) => isActive ? "border-b-2 border-blue-800 pb-1" : "pb-1"}
          >ALL DOCTORS</NavLink>
        </li>
        <li>
          <NavLink
            to="/about"
            className={({ isActive }) => isActive ? "border-b-2 border-blue-800 pb-1" : "pb-1"}
          >ABOUT</NavLink>
        </li>
        <li>
          <NavLink
            to="/contact"
            className={({ isActive }) => isActive ? "border-b-2 border-blue-800 pb-1" : "pb-1"}
          >CONTACT</NavLink>
        </li>
      </ul>

      {/* RIGHT BUTTON / PROFILE */}
      <div className="flex items-center gap-4">
        {token && userData ? (
          <div className="flex items-center gap-2 cursor-pointer group relative">
            {/* Profile pic + dropdown icon */}
            <img src={userData.image} alt="Profile" className="w-8 rounded-full" />
            <img src={dropdown_icon} alt="Dropdown" className="w-2.5" />

            {/* Dropdown menu */}
            <div className="absolute top-full right-0 mt-0 hidden group-hover:flex">
              <div className="min-w-[150px] bg-stone-100 rounded flex flex-col gap-2 p-3 shadow-md z-20">
                <p onClick={() => navigate('my-profile')} className="hover:text-black cursor-pointer">My Profile</p>
                <p onClick={() => navigate('my-appointments')} className="hover:text-black cursor-pointer">My Appointments</p>
                <p onClick={logout} className="hover:text-black cursor-pointer">Logout</p>
              
              </div>
            </div>
          </div>
        ) : (
          <button
            onClick={() => navigate('/login')}
            className="bg-primary text-white px-6 py-2 rounded-full font-light hidden md:block">Create Account</button>
        )}
        <img onClick={() => setShowMenu(true)} className='w-6 md:hidden' src={assets.menu_icon} alt="" />
        {/*menu*/}
        <div className={`${showMenu ? 'fixed w-full' : 'h-0 w-0'} md:hidden right-0 top-0 bottom-0 z-20 overflow-hidden bg-white transition-all`}>
          <div className="flex items-center justify-between px-5 py-4">
            <h1 className="text-2xl w-36 font-extrabold text-blue-800 tracking-tight">MEDIFY</h1>
            <img onClick={() => setShowMenu(false)} src={assets.cross_icon} alt="" className="w-7 cursor-pointer" />
          </div>

          <ul className='flex flex-col items-center gap-2 mt-5 px-5 ext-lg font-medium'>
            <NavLink onClick={() => setShowMenu(false)} to='/'><p className='px-4 py-2 rounded inline-block'>HOME</p></NavLink>
            <NavLink onClick={() => setShowMenu(false)} to='/doctors'><p className='px-4 py-2 rounded inline-block'>ALL DOCTORS</p></NavLink>
            <NavLink onClick={() => setShowMenu(false)} to='/about'><p className='px-4 py-2 rounded inline-block'>ABOUT</p></NavLink>
            <NavLink onClick={() => setShowMenu(false)} to='/contact'><p className='px-4 py-2 rounded inline-block'>CONTACT</p></NavLink>
          </ul>
        </div>

      </div>

    </div>
  );
};

export default Navbar;